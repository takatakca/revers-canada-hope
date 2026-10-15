import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { readLimitedBody } from "@/lib/http/read-limited-body";
import { canManageSupport } from "@/lib/support/access";
import { readReversSession } from "@/lib/takatak/session";

const statuses = ["new", "reviewed", "archived"] as const;
const StatusSchema = z.enum(statuses);
const UpdateSchema = z.object({
  id: z.string().uuid(),
  expectedStatus: StatusSchema,
  status: StatusSchema,
}).strict();
const PAGE_SIZE = 25;

function response(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function operatorAuthorized(request: Request): boolean {
  try {
    const session = readReversSession(request);
    return canManageSupport(
      session?.identityId,
      process.env.REVERS_SUPPORT_ADMIN_IDENTITY_IDS,
    );
  } catch {
    return false;
  }
}

function allowedOrigin(request: Request): boolean {
  const site = process.env.PUBLIC_SITE_URL;
  const origin = request.headers.get("origin");
  if (!site || !origin) return false;
  try {
    const canonical = new URL(site);
    return canonical.protocol === "https:" && origin === canonical.origin;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/internal/revers/support")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!operatorAuthorized(request)) return response({ ok: false, error: "forbidden" }, 403);
        const url = new URL(request.url);
        const pageRaw = url.searchParams.get("page") ?? "0";
        const filterRaw = url.searchParams.get("status") ?? "all";
        if (!/^(0|[1-9][0-9]?)$/.test(pageRaw)) {
          return response({ ok: false, error: "invalid_page" }, 400);
        }
        if (filterRaw !== "all" && !StatusSchema.safeParse(filterRaw).success) {
          return response({ ok: false, error: "invalid_status" }, 400);
        }
        const page = Number(pageRaw);
        try {
          let query = supabaseAdmin
            .from("contacts")
            .select("id,name,email,phone,subject,message,language,status,created_at")
            .eq("source", "REVERS_CANADA_GAR")
            .order("created_at", { ascending: false })
            .order("id", { ascending: false });
          if (filterRaw !== "all") query = query.eq("status", filterRaw);
          const { data, error } = await query.range(
            page * PAGE_SIZE,
            page * PAGE_SIZE + PAGE_SIZE,
          );
          if (error) throw error;
          return response({
            ok: true,
            requests: (data ?? []).slice(0, PAGE_SIZE),
            hasMore: (data ?? []).length > PAGE_SIZE,
            page,
          });
        } catch (error) {
          console.error("[support] case-list failure:", error instanceof Error ? error.message : "unknown");
          return response({ ok: false, error: "unavailable" }, 503);
        }
      },
      PATCH: async ({ request }) => {
        if (!operatorAuthorized(request)) return response({ ok: false, error: "forbidden" }, 403);
        // Cookie-authenticated writes must also prove their originating site.
        if (!allowedOrigin(request)) return response({ ok: false, error: "origin_denied" }, 403);
        if (!request.headers.get("content-type")?.startsWith("application/json")) {
          return response({ ok: false, error: "invalid_content_type" }, 415);
        }
        const body = await readLimitedBody(request, 4096);
        if (body === null) return response({ ok: false, error: "invalid_body" }, 413);
        let parsed: z.SafeParseReturnType<unknown, z.infer<typeof UpdateSchema>>;
        try {
          parsed = UpdateSchema.safeParse(JSON.parse(body));
        } catch {
          return response({ ok: false, error: "invalid_json" }, 400);
        }
        if (!parsed.success || parsed.data.status === parsed.data.expectedStatus) {
          return response({ ok: false, error: "invalid_transition" }, 400);
        }
        try {
          const { data, error } = await supabaseAdmin
            .from("contacts")
            .update({ status: parsed.data.status })
            .eq("id", parsed.data.id)
            .eq("source", "REVERS_CANADA_GAR")
            .eq("status", parsed.data.expectedStatus)
            .select("id,status")
            .maybeSingle();
          if (error) throw error;
          if (!data) return response({ ok: false, error: "conflict" }, 409);
          return response({ ok: true, request: data });
        } catch (error) {
          console.error("[support] case-update failure:", error instanceof Error ? error.message : "unknown");
          return response({ ok: false, error: "unavailable" }, 503);
        }
      },
    },
  },
});
