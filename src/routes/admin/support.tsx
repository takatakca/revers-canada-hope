import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";

type CaseStatus = "new" | "reviewed" | "archived";
type CaseFilter = CaseStatus | "all";
type SupportCase = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  language: string;
  status: string;
  created_at: string;
};
type ListResponse = {
  ok: boolean;
  requests?: SupportCase[];
  hasMore?: boolean;
};
type UpdateResponse = {
  ok: boolean;
  request?: { id: string; status: CaseStatus };
};

const statusValues: CaseStatus[] = ["new", "reviewed", "archived"];

export const Route = createFileRoute("/admin/support")({
  head: () => ({
    meta: [
      { title: "Suivi des demandes — REVERS CANADA" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SupportAdminPage,
});

function SupportAdminPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [filter, setFilter] = useState<CaseFilter>("all");
  const [page, setPage] = useState(0);
  const [requests, setRequests] = useState<SupportCase[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/internal/revers/support?status=${filter}&page=${page}`, {
      signal: controller.signal,
      credentials: "same-origin",
      cache: "no-store",
    })
      .then(async (res) => {
        if (res.status === 403) {
          setForbidden(true);
          throw new Error("forbidden");
        }
        if (!res.ok) throw new Error("unavailable");
        const data = (await res.json()) as ListResponse;
        if (!data.ok || !data.requests) throw new Error("unavailable");
        setForbidden(false);
        setRequests((previous) =>
          page === 0 ? data.requests ?? [] : [...previous, ...(data.requests ?? [])],
        );
        setHasMore(data.hasMore ?? false);
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error && cause.message === "forbidden"
            ? ""
            : fr
              ? "Impossible de récupérer les demandes pour le moment."
              : "Unable to load requests right now.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [filter, page, refreshKey, fr]);

  function selectFilter(value: CaseFilter) {
    setRequests([]);
    setPage(0);
    setFilter(value);
    setRefreshKey((key) => key + 1);
  }

  async function changeStatus(item: SupportCase, status: CaseStatus) {
    if (!statusValues.includes(item.status as CaseStatus) || item.status === status) return;
    setUpdatingId(item.id);
    setError("");
    try {
      const res = await fetch("/api/internal/revers/support", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          expectedStatus: item.status,
          status,
        }),
      });
      const data = (await res.json()) as UpdateResponse;
      if (!res.ok || !data.ok || data.request?.id !== item.id) {
        throw new Error(res.status === 409 ? "conflict" : "update_failed");
      }
      setRequests((previous) =>
        previous.map((entry) =>
          entry.id === item.id ? { ...entry, status: data.request?.status ?? status } : entry,
        ).filter((entry) => filter === "all" || entry.status === filter),
      );
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message === "conflict"
          ? fr
            ? "Demande déjà modifiée par un autre opérateur. Actualisez la liste."
            : "Another operator changed this request. Refresh the list."
          : fr
            ? "Le changement n'a pas été enregistré."
            : "The change could not be saved.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const labels: Record<CaseStatus, string> = fr
    ? { new: "Nouvelle", reviewed: "En traitement", archived: "Archivée" }
    : { new: "New", reviewed: "In progress", archived: "Archived" };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-deep">
          REVERS CANADA · {fr ? "Accès réservé" : "Restricted access"}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">
          {fr ? "Suivi des demandes d'aide" : "Support request management"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {fr
            ? "Renseignements privés. Accès limité aux opérateurs REVERS autorisés avec leur identité TAKATAK."
            : "Private information. Only authorized REVERS operators with a TAKATAK identity can access it."}
        </p>
      </header>

      {forbidden ? (
        <div role="alert" className="rounded-lg border border-border bg-white p-6">
          <p className="font-semibold text-ink">
            {fr ? "Accès refusé ou session expirée." : "Access denied or session expired."}
          </p>
          <a
            className="mt-4 inline-block text-sm font-semibold text-teal-deep underline"
            href="https://takatak.ca/api/experiences/revers/launch"
          >
            {fr ? "Se connecter avec TAKATAK" : "Sign in through TAKATAK"}
          </a>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <label htmlFor="case-status" className="text-sm font-semibold text-ink">
              {fr ? "Statut" : "Status"}
            </label>
            <select
              id="case-status"
              value={filter}
              onChange={(event) => selectFilter(event.target.value as CaseFilter)}
              className="rounded-md border border-border bg-white px-3 py-2 text-sm text-ink"
            >
              <option value="all">{fr ? "Toutes" : "All"}</option>
              {statusValues.map((value) => (
                <option key={value} value={value}>{labels[value]}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setRequests([]);
                setPage(0);
                setRefreshKey((key) => key + 1);
              }}
              className="rounded-md border border-border bg-white px-3 py-2 text-sm text-ink hover:bg-cream"
            >
              {fr ? "Actualiser" : "Refresh"}
            </button>
          </div>

          {error && <p role="alert" className="mb-6 text-sm text-red-700">{error}</p>}
          {!loading && requests.length === 0 && !error && (
            <p className="rounded-lg border border-border bg-white p-6 text-sm text-ink">
              {fr ? "Aucune demande pour ce filtre." : "No requests match this filter."}
            </p>
          )}

          <ul className="space-y-4">
            {requests.map((item) => (
              <li key={item.id} className="rounded-lg border border-border bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleString(fr ? "fr-CA" : "en-CA")}
                    </p>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink">
                    {labels[item.status as CaseStatus] ?? item.status}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{item.subject || (fr ? "Sans sujet" : "No topic")}</p>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-ink">{item.message}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-teal-deep">
                  <a href={`mailto:${encodeURIComponent(item.email)}`} className="break-all underline">{item.email}</a>
                  {item.phone && <span className="text-ink">{item.phone}</span>}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label htmlFor={`case-${item.id}`} className="text-sm font-semibold text-ink">
                    {fr ? "Traitement" : "Processing"}
                  </label>
                  <select
                    id={`case-${item.id}`}
                    value={item.status}
                    disabled={updatingId === item.id}
                    onChange={(event) => void changeStatus(item, event.target.value as CaseStatus)}
                    className="rounded-md border border-border bg-white px-3 py-2 text-sm text-ink disabled:opacity-60"
                  >
                    {statusValues.map((value) => (
                      <option key={value} value={value}>{labels[value]}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
          {loading && <p role="status" className="mt-6 text-sm text-muted-foreground">{fr ? "Chargement…" : "Loading…"}</p>}
          {!loading && hasMore && (
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              className="mt-6 rounded-md bg-teal-deep px-5 py-3 text-sm font-semibold text-white"
            >
              {fr ? "Afficher plus de demandes" : "Load more requests"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
