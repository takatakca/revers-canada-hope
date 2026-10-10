import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
  console.log("PASS:", message);
}

assert(!existsSync(join(root, "wrangler.jsonc")), "Cloudflare/Lovable wrangler config removed");
assert(!existsSync(join(root, "src/integrations/supabase/previewAuthStorage.ts")), "Lovable preview auth broker removed");

const packageJson = JSON.parse(read("package.json"));
assert(!packageJson.devDependencies?.["@lovable.dev/vite-tanstack-config"], "Lovable Vite package removed");
assert(!packageJson.dependencies?.["@cloudflare/vite-plugin"], "Cloudflare Vite package removed");
assert(packageJson.scripts?.start === "node .output/server/index.mjs", "Node/Nitro production start script configured");

const vite = read("vite.config.ts");
assert(vite.includes('from "nitro/vite"'), "Nitro adapter is configured");
assert(!vite.toLowerCase().includes("lovable"), "Vite config contains no Lovable dependency");

const env = read(".env.example");
assert(!env.includes("lovable.app"), "Environment example contains no Lovable host");
assert(!env.includes("VITE_CONTACT_EMAIL"), "Invented contact mailbox is not configured");

const contact = read("src/lib/contactService.ts");
assert(!contact.includes("mailto:"), "Contact service has no mailto fallback");
assert(contact.includes("/api/contact"), "Contact service uses the internal server endpoint");

const checkout = read("src/lib/checkout.functions.ts");
assert(!checkout.includes("lovable.app"), "Stripe callback has no Lovable fallback");

const app = read("app.js");
assert(app.includes("releases"), "Passenger loader uses immutable releases");
assert(app.includes("CURRENT"), "Passenger loader uses CURRENT release pointer");

console.log("REVERS GitHub migration verification passed.");
