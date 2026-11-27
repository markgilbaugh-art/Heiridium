# Heiridium Academy publishing engine

The engine prepares original, evidence-backed drafts for human review and publishes at most one approved article per Central calendar day. Publishing is initially paused. Installing the code does not approve an article or enable paid generation.

## Existing architecture and audit

The audited source is `markgilbaugh-art/Heiridium`, main commit `0d447fb77de96a4b8a2e1b84a498afa9edb3e73d`. It is a Next.js App Router site using Node 22, pnpm 12.3.4, static TypeScript content, four Academy topic hubs, industry hubs, books, existing consultation forms, and Vercel Analytics. The 32 existing records comprise 13 currently live articles and 19 draft/in-review outlines. See `BASELINE.json` for the exact inventory. No existing `.github` workflow or cloud article researcher/publisher was present. Existing scheduled records use date gating during page generation/revalidation; this engine does not rewrite them.

GitHub's successful Vercel status for the baseline points to the **heiridium** project: `https://vercel.com/markgilbaugh-4282s-projects/heiridium/Bi1Pw4QjNetz4nGV6PWnRdgt8fte`. The supplied `heiridium-marketing-ni5jw9o3t-markgilbaugh-4282s-projects.vercel.app` URL is a protected preview. The current PR preview is Ready at `https://heiridium-git-feat-academy-a-357658-markgilbaugh-4282s-projects.vercel.app`, according to Vercel’s GitHub status. Neither project/deployment is accessible through the current Vercel API connection. Do not create a replacement project or change domains to work around this access gap.

## Data and execution

- `content/academy/articles/<slug>.json`: strict data-only draft, source provenance, exact calculations, original-image metadata, and independent verification result. No executable MDX, HTML, or model-selected file paths.
- `content/academy/approvals/<slug>.json`: actual human identity, workflow run, date, and SHA-256 of the **entire** article record. Sensitive content needs a second authorized qualified review. No approvals are supplied with this implementation.
- `content/academy/publication-ledger.json`: durable Central date, slug, article digest, image digest, publication timestamp, and run. The ledger and publication state are committed atomically. A deployment retry uses this same entry and never consumes a second article for the day.
- `lib/academy/read-model.ts` adapts approved, validated, ledger-recorded content to the existing Academy selectors. Existing routes, books, source content, logo and navigation remain in place. Pending drafts are absent from public pages, metadata and sitemap.
- `scripts/academy/`: bounded source retrieval, research, separate writer and verifier calls, image generation/optimization, cost admission, calendar extension, approvals, restricted Git writes, exact-commit deployment checks, notifications and optional read-only Search Console summaries.
- GitHub Actions supplies persistent cloud execution. No database, Supabase service, additional hosting project, or Codex desktop automation is required.

The private `/editorial` queue shows publication state, approved inventory, next ready article and draft review state. `PREVIEW_SECRET` is required outside local `next dev`. Missing or incorrect credentials return 404. Keep preview links private; never put their token in issue comments, logs or screenshots. Drafts show a proposed date and omit Article JSON-LD. A successful published article includes its actual publication date, cover/OG image, canonical, Article JSON-LD, sources, disclosure and recorded review attribution.

## Cloud setup, without sharing secrets in chat

1. Restore the existing project's Vercel connection, confirm its Git source is this repository/main and its production domain is `heiridium.com`. The Vercel bot on PR #1 identifies project `prj_NLLRhlNQl74FwMs9xSAftYEws3B3` and team `team_4DPg4TYWgSzRUHPOwJSdNIJt`; these are recorded in `publishing-config.json` and must be confirmed against restored API access. The project name is currently `heiridium`; a prior marketing preview hostname is not evidence of the current project ID.
2. Create/install a dedicated GitHub App on **Heiridium only**: Contents write, Pull requests write, Actions read, Issues write. Preserve branch protection. Configure a narrowly scoped permitted automation identity if the existing policy allows it; otherwise publication commits must follow the protected PR process and the job will stop on denial. Do not bypass protections. The App identity, rather than the default `GITHUB_TOKEN`, makes the push eligible for the normal Vercel Git integration; its real deployment must still be verified.
3. Create GitHub environment `academy-publisher`, restricted to reviewed `main`. Add its secrets: `ACADEMY_APP_ID`, `ACADEMY_APP_PRIVATE_KEY`, `OPENAI_API_KEY`, and `VERCEL_READ_TOKEN`. The Vercel credential is only used for deployment reads; grant the narrowest available scope for the existing team/project. No OpenAI key is needed in the website/browser. Optional: `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT`, authorized as a read-only user of `sc-domain:heiridium.com`.
4. Set a separate strong `PREVIEW_SECRET` on the existing Vercel project's appropriate environments. Keep existing lead-delivery settings unchanged. Confirm Vercel Analytics custom events are enabled for the project. No visitor name, email, message, phone, revenue, or tax data is sent in Academy analytics.
5. Confirm `editorialActors` contains actual editorial approvers. Add `professionalActors` only after confirming their relevant qualifications and scope. An empty list deliberately blocks sensitive publication. Financial illustrations, valuation, tax/trust/legal/investment content and a verifier's high-risk flag require qualified review.
6. Review models, current prices and reservation limits. Start with `enabled: false`; set repository variable `ACADEMY_ENGINE_CONFIGURED=true` only after the environment, App and permission tests succeed. An unset variable skips cloud jobs completely. `ACADEMY_PUBLISHING_DISABLED=true` is the immediate emergency stop for paid generation and publication.
7. Run manual `status`, then `verify-draft` for one of the seven initial drafts. Merge its content-only verification PR after checks and review. No live provider call was claimed in local verification; the initial independent reports are intentionally pending.
8. Preview the exact draft. Run manual `approve`, choosing `editorial` and entering the real reviewer name. For sensitive content, run `approve` again as an allowlisted qualified person with `professional`, actual name, and actual relevant qualification. The trusted actor comes from GitHub, not an input. A generic PR merge does not count as content approval.
9. Build seven genuinely approved articles. Use `status` to confirm inventory, then manually `resume` after the correct Vercel project configuration and read credential are in place. Verify the first real App push, intended production SHA, public article, image hash, home/Academy/topic/industry listings, canonical, schema and sitemap. Do not call the system operational until that rehearsal succeeds.

The current connector cannot create GitHub environment secrets, install a GitHub App, verify a professional's credentials, or access the Heiridium Vercel project. Those setup steps remain explicit rather than silently simulated.

## Schedule and manual controls

The pinned workflow uses GitHub's native IANA timezone field, `America/Chicago`, which handles CST/CDT:

| Central time | Operation |
| --- | --- |
| 05:15 daily, all seven days | Replenish approved-inventory pipeline with a researched draft PR |
| 06:00 daily, all seven days | Publish one ready, approved article, or skip/stop if none is eligible |
| Monday 07:00 | Publishing inventory/activity and available Search Console summary |

GitHub scheduled jobs can be delayed by the platform; this is a scheduled target, not a wall-clock delivery SLA. The application rejects publication before 06:00 Central. One shared concurrency group serializes all engine jobs. If an engine draft PR is already open, generation skips before reserving cost, preventing repeated drafts of the same topic. Historical calendar entries are retained; a generation run adds up to seven planning-only briefs to refill the rolling 90-day horizon. A large prolonged gap may require multiple replenishment runs and human review.

Actions → **Academy publisher** → Run workflow on **main** supports:

| Operation | Effect |
| --- | --- |
| `status` | Show state, next ready article, inventory and outstanding qualified reviews |
| `generate` + optional unused calendar slug | Search, retrieve 3–6 primary sources, draft, independently verify, make at most one correction, generate original image, open draft PR |
| `preview` + slug | Return the private route, without a credential |
| `verify-draft` + slug | Refresh evidence, run independent verifier, reset approval, open reviewed content PR |
| `regenerate-image` + slug | Generate a new original image, refresh evidence and verification, reset approval, open reviewed content PR |
| `approve` + slug/kind/name/qualification | Record real human review of the exact validated draft; qualified review is separately authorized |
| `publish` | Select oldest ready eligible proposal, record one durable publication, push via App, verify deployment |
| `retry` | Reverify today's already recorded publication; never choose another article |
| `pause` / `resume` | Commit the explicit publication switch; only authorized humans can use these |
| `weekly` | Produce available publishing/search summary; unavailable integrations are labeled |

Published article content is immutable through draft/approval operations. Make factual corrections in a normal reviewed correction PR with updated source evidence and review. Never delete the daily ledger to retry a deployment.

## Costs, retries and observability

Defaults reserve **250 cents before each paid generation/verification run**, with **500 cents/day** and **7,500 cents/month** reservation admission limits. The reservation artifact is uploaded before a provider call, retained 90 days, and counted even after a crash or retry. A rerun needs another reservation. Consequently the conservative monthly default admits 30 full reservations, not an unlimited number of drafts. Artifact deletion by an administrator can invalidate the history; do not remove current-period reservation artifacts. Concurrency must remain enabled.

Current text price configuration records GPT-5.4 at $2.50/$15 per million input/output tokens and GPT-5.4-mini at $0.75/$4.50, plus $0.01 per web search call. The image line is a **conservative estimate**, not observed billing. Planning estimate: approximately $0.50–$2.50 per attempted complete draft at these bounds, or roughly $15–$75 for 30 attempts, excluding hosting usage and optional paid services. The token/output/source limits and one-correction rule bound work; a reservation is an admission control, **not a guarantee of the provider's final invoice**. Check provider spend controls, account limits and current prices before unattended use. No measured provider invoice is available from this local run; the seven demonstration images were made with the built-in image tool.

Each HTTP request has a timeout; source and response sizes are bounded. Only explicit provider 429s get two bounded backoff retries. Ambiguous timeouts/5xx are stopped, because a paid request may already have been processed. Durable reservation accounting still applies. Daily idempotency survives a successful commit followed by a deployment failure. Failed/conflicting Git pushes never force-update main.

Actions summaries and redacted report artifacts contain operation results and token/call estimates. GitHub issues notify on workflow failures, verified publication and low approved inventory; open incident markers prevent a new issue for every repeat. A generated content PR identifies needed editorial/professional review. Optional Search Console uses the `webmasters.readonly` scope and page aggregates, not visitor identities or search queries. CTA click and accepted form-submission events in existing Vercel Analytics contain only a known article slug. Analytics/Search Console data was not invented for the local demonstration.

## Safety stop list

Stop generation/publication on an emergency disable, exhausted/unverifiable reservation history, absent required credentials, unsupported provider response, inaccessible/unsafe source, factual or originality failure, unsafe content/path, incorrect calculations, missing/corrupt image, stale evidence, missing/unauthorized human approval, changed article digest, insufficient qualified review, duplicate ledger date, wrong app/repository/branch/environment, denied/conflicting Git push, failed production commit, or failed public verification. Never repair these by granting model approval, changing a reviewer name, removing a ledger entry, disabling protection, broadening integration access, or force-pushing.

A rejected draft stays out of approved inventory. An empty inventory means no new article, not permission to publish fictional or unreviewed content. A merged PR establishes implementation evidence; it does not establish production acceptance or human content approval.

## Local verification and handoff format

Use Node 22 and `pnpm install --frozen-lockfile`. Run `pnpm check:academy`, `pnpm build`, `pnpm exec playwright install chromium`, then `pnpm test:browser`. Browser tests create a disposable loopback-only server and private test credential, then shut them down. Screenshots and results are in ignored `artifacts/`; the tests exercise normal editorial navigation at 1440×1000 and 390×844.

Record each future issue as: severity; route/operation; integration SHA; role/fixture; reproduction; expected/actual; screenshot/log/timing; review state; required next action. Record deployment acceptance separately with production commit, Vercel deployment URL, production URL, verification time and checks. Never record keys, preview tokens, source excerpts or lead PII in the handoff.

Authoritative references: [GitHub schedule timezone syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [OpenAI web search](https://developers.openai.com/api/docs/guides/tools-web-search), [Google guidance on AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content). These controls support useful and trustworthy publication; no ranking or traffic outcome is guaranteed.
