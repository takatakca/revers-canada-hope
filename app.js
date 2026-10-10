// Dependency-free cPanel/Passenger loader for the immutable REVERS release layout.
// GitHub Actions builds the application; MochaHost never runs a build or npm install.
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = __dirname;
const currentPath = path.join(root, "CURRENT");

if (!fs.existsSync(currentPath)) {
  throw new Error("REVERS deployment is missing CURRENT");
}

const release = fs.readFileSync(currentPath, "utf8").trim();
if (!/^[A-Za-z0-9._-]+$/.test(release)) {
  throw new Error("REVERS deployment has an invalid CURRENT value");
}

const entry = path.join(root, "releases", release, ".output", "server", "index.mjs");
if (!fs.existsSync(entry)) {
  throw new Error(`REVERS release entry does not exist: ${entry}`);
}

process.env.RELEASE_SHA = release;
process.chdir(path.join(root, "releases", release));

import(pathToFileURL(entry).href).catch((error) => {
  console.error("[revers] failed to start release", release, error);
  process.exitCode = 1;
});
