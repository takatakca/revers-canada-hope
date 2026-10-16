import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("REVERS resource directory links to identified official service pages", async () => {
  const page = await readFile(new URL("../src/routes/ressources.tsx", import.meta.url), "utf8");
  assert.match(page, /https:\/\/www\.211qc\.ca\//);
  assert.match(page, /https:\/\/www\.juridiqc\.gouv\.qc\.ca\/separation-et-divorce/);
  assert.match(
    page,
    /https:\/\/www\.quebec\.ca\/famille-et-soutien-aux-personnes\/separation-divorce\/mediation-familiale/,
  );
  assert.match(
    page,
    /https:\/\/www\.retraitequebec\.gouv\.qc\.ca\/fr\/citoyens\/enfants\/allocation-famille\/je-partage-garde-enfant/,
  );
  assert.match(page, /Ces services sont indépendants de REVERS CANADA/);
  assert.match(page, /These services are independent of REVERS CANADA/);
});
