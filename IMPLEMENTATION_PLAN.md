# Sprixo website recreation — six-phase plan

Date: 29 October 2026. Phase 1 only is authorized in the current task. Phases 2–6 below are a proposed sequence, because their names and detailed boundaries were not supplied. No later phase has started.

## Phase 1 — Website analysis

Deliverable: `SITE_AUDIT.md`, based on the published website's HTML, CSS and JavaScript, with route/project/asset inventory, design tokens, source-defined responsive behavior, interactions, form contracts and access limitations. This phase also produces this plan. Browser visual verification remains explicitly outstanding; no implementation or installation occurs in this phase.

## Phase 2 — Content, assets and project foundation

- Resolve screenshot/visual evidence gaps listed in the audit; capture the current reference before it changes.
- Confirm the full 82-project scope, exact copy, artwork provenance, original logo files and backend/admin needs.
- Initialize Vite with vanilla JavaScript, HTML5 and CSS3 only when this phase is authorized. Keep PHP separate from the Vite runtime; Node is a local build tool, not a Hostinger runtime requirement.
- Use a static multipage structure preserving main `.html` and `projects/*.html` routes; decide build-time generation for repeated project templates without a production framework requirement.
- Organize shared styles/scripts, local image variants and a project data manifest. Retain source-to-local asset mappings, text, credits and previous/next ordering.
- Agree on PHP persistence, mail delivery and booking approach before backend work. Confirm actual hosting capabilities then using current Hostinger documentation/account settings.

Exit: route/asset manifest complete, build approach established, reference evidence sufficient for faithful recreation, backend scope resolved.

## Phase 3 — Shared design system and homepage

- Implement documented colors, typography, spacing, full logos, header/footer, keyboard focus and responsive foundations.
- Recreate homepage sections in the audited order, including real artwork, six selected projects, ticker, studio and accordions.
- Add source-supported hover/reveal/reduced-motion behavior.
- Compare desktop and mobile renderings against the actual reference and supplied screenshots, including the later CSS overrides.

Exit: homepage and shared shell visually reviewed at desktop, tablet and mobile sizes; links/keyboard navigation and reduced motion checked.

## Phase 4 — Portfolio and internal presentation pages

- Build work archive with all 82 project entries, filters, live search, counts and no-results reset.
- Build all project routes with correct cover, copy, gallery, source credits, sticky cover transition and previous/next links. Do not invent carousel motion from unused data attributes.
- Build five service panels and quote preselection links, careers/contact/quote/consultation form layouts, and privacy content.
- Preserve metadata, descriptive alt text, lazy image loading, responsive image sizes, canonical paths and sitemap coverage; update production origin only when known.

Exit: complete navigable static site, route/link/asset checks pass and representative brand/logo cases match reference at multiple widths. Form UI exists but is not claimed operational until Phase 5.

## Phase 5 — PHP forms and consultation services

- Implement PHP equivalents of necessary public API contracts or explicitly update client endpoint paths consistently.
- Validate all fields server-side; consent, spam protection, rate limits and idempotency; persist safely with access-controlled storage and backups.
- Enforce IST business hours, notice/window rules and atomic reservation; handle stale availability/conflicts and calendar download.
- Configure recipient/SMTP if required, distinguish saved enquiry from delivered notification, and provide honest failure/retry states.
- Implement authenticated admin review/cancellation/export only if confirmed in scope. Preserve privacy guarantees and never place credentials or records in public static output.
- Wire optional public configuration, WhatsApp/email and consent-based analytics only with confirmed values.

Exit: staging verification covers successful/invalid/duplicate enquiries, careers URL validation, booking conflicts/concurrency, time boundaries, notification failures and access controls. Do not test against real production bookings.

## Phase 6 — Verification and Hostinger handoff

- Run the production build, inspect static output and PHP packaging, check every route and image, and test direct nested URLs and missing-page behavior.
- Validate layout against reference at approximately 390, 768, 1024 and 1440px, plus narrow screens; check hover/focus/touch and reduced motion. Add targeted checks at relevant CSS breakpoints.
- Verify keyboard/form accessibility, image sizes/loading, SEO metadata/sitemap, console/network errors and cross-browser behavior.
- Prepare uploadable production files and concise Hostinger instructions: public document-root contents, PHP endpoints, protected configuration/storage, HTTPS and optional rewrite rules. Preserve `.html` navigation so basic page delivery does not depend on SPA rewrites.
- Test PHP through a PHP-capable staging environment; Vite preview alone cannot verify server behavior. Verify backend settings against the actual Hostinger plan at this stage.
- Prepare backup/rollback and deployment checks. Upload/deploy only within the user's authorized later-phase scope.

Exit: production package and deployment instructions are reviewable, site/form checks are recorded, and any remaining visual or hosting limitations are stated clearly.

## Current stop point

Stop after Phase 1. No Vite installation, application implementation, live form submission, account changes or deployment is part of this delivery.
