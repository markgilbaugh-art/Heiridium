# Implementation verification

Baseline: `0d447fb77de96a4b8a2e1b84a498afa9edb3e73d`, branch `feat/academy-autonomous-publisher`. Verification performed locally on Node 22 against the production Next.js build. This records implementation evidence, not hosted acceptance or content approval.

## Results

| Boundary | Result | Evidence |
| --- | --- | --- |
| TypeScript and scoped React/engine lint | PASS | `pnpm check:academy` |
| Security, approvals, dates, costs, sources, provider request boundaries | PASS | 42 tests, zero skips |
| Production build | PASS | 49 static/dynamic route outputs, type errors enforced |
| Desktop browser | PASS | 3 journeys at 1440×1000 |
| Mobile browser | PASS | 3 journeys at 390×844 |
| Draft structure, links, image hashes and hypothetical calculation | PASS | 7 JSON drafts pass deterministic validation |
| Existing content | PASS locally | 32 original slugs preserved; 13 legacy live articles remain live |
| Private editorial navigation | PASS | Queue → Silver Wave preview, original image, headings, keyboard-focusable table |
| Draft isolation | PASS | No-token/wrong-token preview 404; unapproved article 404; absent from public Academy/home/topic/sitemap and Article JSON-LD |
| Article consultation attribution | PASS locally | Normal article CTA → form, known article slug carried into hidden attribution field |
| Human and qualified content approval | PENDING | No approvals fabricated; qualified actor list empty |
| Paid model and image API rehearsal | BLOCKED | API credential setup pending; provider boundary tested with explicit mocks |
| Hosted Vercel acceptance | BLOCKED | Current connector returns project/deployment 404; no local authenticated Vercel CLI is installed |
| Search Console / live custom-event measurements | UNCONFIGURED | Optional account access and live deployment verification still required |

Browser artifacts are generated in ignored `artifacts/`: `editorial-queue-desktop.png`, `editorial-queue-mobile.png`, `silver-wave-preview-desktop.png`, `silver-wave-preview-mobile.png`, and `browser-results.json`. CI preserves the same evidence as an artifact. No preview credential is included in this report.

## Findings resolved during verification

1. The initial desktop test selected the header contact link instead of the article-specific CTA. The test now targets the attributed link through normal navigation.
2. Screenshot review exposed real mobile overflow from the article grid's minimum width around a table. Added `min-w-0` and changed the assertion to compare document scroll width with document client width. The corrected production build passes the mobile journey.
3. The initial request schema used Zod's URI format, outside the documented strict model-output formats. The provider adapter now normalizes the API schema while retaining strict local Zod URL and length validation.
4. A pending content PR could otherwise cause repeated drafts of the same topic. Preflight now checks open engine PRs before reserving cost; no second draft or paid request is made while that PR awaits review.
5. Removed the preexisting `ignoreBuildErrors` setting and added explicit type/lint/tests to CI. Source and image content checks are distinct from machine factual/originality verification and human approval.

## Initial review inventory

Seven substantive drafts, approximately 714–951 body words each, with individual original 1536×864 WebP images (90–134 KB). The files are intentionally marked `validation.status: pending` until a real independent verifier call succeeds. The shorter lengths answer the selected planning questions without padding. The original source evidence was retrieved, hashed, and summarized narrowly; full copyrighted source text is not committed.

The initial planning horizon is November 27, 2026–February 24, 2027, with 90 distinct entries. Thirty research briefs contain proposed questions, keywords, intent, outline, related content, service route, dates, source candidates and research status. Existing profit/cash, owner-dependency, buyer-records and family-leadership overlaps were replaced with distinct action/evidence questions; separate model semantic verification remains a publication gate.

## Remaining acceptance rehearsal

1. Restore access to the existing Vercel project **heiridium**, verify repository/main/domain, and record project/team IDs.
2. Configure the dedicated repository App, protected environment and required secrets; keep publication paused.
3. Run a real `verify-draft`, review its content PR, and record actual human editorial approval. Assign appropriately qualified reviewers before sensitive approvals.
4. Fill the seven-article approved inventory, verify App-triggered Vercel deployment of the intended commit, then enable 6 AM Central publication.
5. On the first approved publication, record: exact commit, Vercel deployment, production URL, time, image hash, rendered canonical/Article data, all relevant listings, sitemap, and consultation analytics. Until those checks pass, label production acceptance pending.
