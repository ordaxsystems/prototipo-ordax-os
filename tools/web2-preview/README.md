# OrdaX Web2 — isolated visual evaluation
User-requested complete Web layout copy from washingtonmsdj/account-hub-pro,
commit 0f955ece6e570801976d8ed77d2cada101b7a3fa.
Owner: OS design evaluation. This is a UI fixture, not a second production runtime.
Original components, CSS, assets, app interfaces, launcher, dock and window modes
are retained. provenance.json records the exact source hashes and preview changes.
No production build imports this folder. No credentials or inference server copied.
Intelligence examples and Store progress remain upstream simulations, not real
model/tool execution, installation or OS receipts. Availability labels remain.
No Identity, Memory, grants, sync, billing or execution authority is added.

The upstream README claims full ownership; no explicit LICENSE was found.
User expressly requested this copy. Production redistribution/integration requires
owner review of rights, dependencies and contracts. This preview is local-only.

Requires Node 22.12+ and npm:
npm ci --ignore-scripts
npm run build
npm run preview
Open http://127.0.0.1:4201/web2/

Risk: third-party presentation/demo dependencies, isolated from production.
Acceptance: reference layout and visual navigation in desktop/mobile.
Account and public-site routes are outside scope. No redesign/integration in this
first copy; wait for user evaluation before migrating to the canonical Web.

Verification: npm run verify (Node built-in TypeScript stripping).
Checks original file/asset hashes with Git line-ending normalization, window
lifecycle without duplicate instances, restore after minimize, geometry bounds,
initial-state immutability and the disabled model boundary. This is not an
end-to-end service or production availability check.
