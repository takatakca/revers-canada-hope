/**
 * SEO + consent kit: the ONE settings file per site.
 *
 * Rules:
 * - Only facts already present in this repo. Never invent an address, hours, phone, rating or review.
 * - Unknown values stay `undefined` with a `TODO(owner)` comment; the JSON-LD builder skips them.
 * - `url` is the real production domain (see foodhubca/private/hosting/MOCHAHOST_DOMAINS.md), never *.lovable.app.
 */

export type SchemaType =
  "Organization" | "LocalBusiness" | "Restaurant" | "NGO" | "SportsOrganization" | "Event";

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string | undefined;
  addressCountry: string;
};

export type SiteConfig = {
  /** Public business name. */
  name: string;
  /** Legal name if different (TODO(owner) when unknown). */
  legalName?: string | undefined;
  /** Real production origin, no trailing slash. */
  url: string;
  /** <html lang>. French first (Québec). */
  lang: "fr-CA";
  /** Open Graph locale. */
  locale: "fr_CA";
  defaultTitle: string;
  defaultDescription: string;
  /** Default share image: path under /public or absolute URL. undefined = no og:image. */
  ogImage?: string | undefined;
  /** Logo: path under /public or absolute URL. */
  logo?: string | undefined;
  schemaType: SchemaType;
  email?: string | undefined;
  /** E.164, e.g. "+15145550000". */
  phone?: string | undefined;
  address?: PostalAddress | undefined;
  /** Real social profile URLs only (no "#", no generic facebook.com). */
  sameAs: string[];
  /** Privacy policy route, used by the cookie banner. undefined = no page yet (TODO(owner)). */
  privacyPath?: string | undefined;
  /** Law 25 privacy officer. */
  privacyOfficer: { name?: string | undefined; email?: string | undefined };
};

export const SITE: SiteConfig = {
  name: "REVERS CANADA",
  // TODO(owner): exact legal name of the organization, if different.
  legalName: undefined,
  url: "https://reverscanada.ca",
  lang: "fr-CA",
  locale: "fr_CA",
  // TODO(owner): the site has two descriptions (default: women and children; home page: fathers /
  // RêvPÈRE). The existing default is kept unchanged here; the owner must choose one.
  defaultTitle: "Revers Canada — Refuge, nourriture & retour à l'emploi au Québec",
  defaultDescription:
    "Revers Canada est un organisme de bienfaisance québécois qui accompagne les femmes et enfants en situation d'itinérance vers un toit, des repas et un emploi.",
  ogImage: "/icon-512.png",
  logo: "/icon-512.png",
  schemaType: "NGO",
  email: "reverscanada@gmail.com",
  // TODO(owner): 514-825-2825 (shown in the footer) is also R2NETTE's number. Confirm before adding it.
  phone: undefined,
  address: {
    streetAddress: "5505 Rue Irwin",
    addressLocality: "LaSalle",
    addressRegion: "QC",
    postalCode: "H8N 1A1",
    addressCountry: "CA",
  },
  // TODO(owner): real Facebook / Instagram page URLs (the footer links were "#").
  sameAs: [],
  privacyPath: "/privacy",
  // TODO(owner): name + email of the person responsible for personal information (Law 25).
  privacyOfficer: { name: undefined, email: undefined },
};
