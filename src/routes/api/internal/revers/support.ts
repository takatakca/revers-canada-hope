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

function authorizedOperatorId(request: Request): string | null {
  try {
    const session = readReversSession(request);
    return canManageSupport(
      session?.identityId,
      process.env.REVERS_SUPPORT_ADMIN_IDENTITY_IDS,
    ) ? session!.identityId : null;
  } catch {
    return null;
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
        if (!authorizedOperatorId(request)) return response({ ok: false, error: "forbidden" }, 403);
        const url = new URL(request.url);
        const historyId = url.searchParams.get("history");
        if (historyId !== null) {
          const uuid = z.string().uuid().safeParse(historyId);
          if (!uuid.success) return response({ ok: false, error: "invalid_id" }, 400);
          try {
            // Prove the record belongs to REVERS before returning its audit.
            const { data: contact, error: contactError } = await supabaseAdmin
              .from("contacts")
              .select("id")
              .eq("id", historyId)
              .eq("source", "REVERS_CANADA_GAR")
              .maybeSingle();
            if (contactError) throw contactError;
            if (!contact) return response({ ok: false, error: "not_found" }, 404);
            const { data, error } = await supabaseAdmin
              .from("revers_support_status_audit")
              .select("id,previous_status,new_status,actor_takatak_identity_id,changed_at")
              .eq("contact_id", historyId)
              .order("changed_at", { ascending: false })
              .limit(50);
            if (error) throw error;
            return response({ ok: true, history: data ?? [] });
          } catch (error) {
            console.error("[support] audit-list failure:", error instanceof Error ? error.message : "unknown");
            return response({ ok: false, error: "unavailable" }, 503);
          }
        }
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
        const operatorId = authorizedOperatorId(request);
        if (!operatorId) return response({ ok: false, error: "forbidden" }, 403);
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
          // Database function updates the contact and inserts its actor audit
          // atomically. A missing migration fails closed with HTTP 503.
          const { data, error } = await supabaseAdmin.rpc("revers_transition_support_status", {
            p_contact_id: parsed.data.id,
            p_expected_status: parsed.data.expectedStatus,
            p_new_status: parsed.data.status,
            p_actor_takatak_identity_id: operatorId,
          });
          if (error) throw error;
          if (!data?.length) return response({ ok: false, error: "conflict" }, 409);
          return response({ ok: true, request: {
            id: data[0].contact_id,
            status: data[0].status,
          } });
        } catch (error) {
          console.error("[support] case-update failure:", error instanceof Error ? error.message : "unknown");
          return response({ ok: false, error: "unavailable" }, 503);
        }
      },
    },
  },
});
