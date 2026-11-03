# Sprixo technical and maintenance documentation

Based on the current implemented repository inspected on **3 November 2026**. Earlier audit and implementation-plan documents are not treated as the final specification. No dependencies were installed, build run, website deployed, or external websites consulted for this guide. **Requires verification** identifies live hosting or account settings that source code cannot establish.

## 1. Project overview

Sprixo uses HTML, CSS, vanilla JavaScript and Vite for a multipage static website. A custom build plugin generates project detail pages from JSON. Three PHP endpoints send email using PHPMailer and Hostinger SMTP. Cal.com handles booking externally. There is no React application, client-side router or custom application database.

### Files and architecture

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage, Selected Work, and shared header/footer source for generated project pages |
| `work.html` | Manually maintained project cards, filters, search field and Load More |
| `services.html` | Services and enquiry links |
| `careers.html`, `contact.html`, `quote.html` | Form pages |
| `consultation.html` | Cal.com embed and page-specific inline CSS |
| `privacy.html` | Privacy content and inline styles; includes owner-confirmation items |
| `project.html` | Placeholder template for project detail generation |
| `data/projects.json` | Ordered array of 82 project detail records |
| `projects/build-plugin.cjs` | Development project routes and production HTML generation |
| `projects/template.cjs` | Detail renderer, shared header/footer extraction and Previous/Next links |
| `src/main.js` | Global CSS import, mobile menu and floating WhatsApp link |
| `src/style.css` | Global layout, palette, typography, responsive styles, shared buttons and Work controls |
| `src/work.js` | Search, filters, results count and Load More visibility |
| `src/project.js`, `src/project.css` | Detail hero scroll behavior and detail layout |
| `src/careers.js`, `src/contact.js`, `src/quote.js` | Form submission and status handling |
| `src/careers.css` | Shared form/page styling imported by form scripts |
| `src/quote.css` | Quote-specific styles, linked by `quote.html` |
| `public/api/` | `careers.php`, `contact.php`, `quote.php` |
| `public/assets/` | Runtime images, logos and favicon; subfolders include `listing`, `originals`, `projects`, `mountdesign` |
| `public/projects/`, `public/originals/`, `public/mountdesign/` | Additional existing public content copied as-is; check references before removing |
| `public/preloader.js`, `public/preloader.css` | Shared loading overlay loaded directly from HTML |
| `public/.htaccess` | Apache clean URLs and legacy HTML redirects |
| `server/sprixo-private/` | Composer manifest and safe example SMTP configuration |
| `vite.config.js` | Nine build inputs, project generator and private-template packaging |
| `package.json`, `package-lock.json` | npm scripts and dependency resolution |
| `vercel.json` | Vercel clean URL settings; does not implement PHP hosting |
| `.gitignore` | Generated files, dependencies and private configuration exclusions |
| `dist/`, `dist-private/` | Generated deployment artifacts, ignored by Git |
| `HOSTINGER_CAREERS.md` | Earlier hosting notes; compare with current code before following |
| `SITE_AUDIT.md`, `IMPLEMENTATION_PLAN.md` | Historical analysis/planning, not authoritative implementation data |

### Routes

| Public route | Source |
| --- | --- |
| `/` | `index.html` |
| `/work` | `work.html` |
| `/services` | `services.html` |
| `/careers` | `careers.html` |
| `/contact` | `contact.html` |
| `/quote` | `quote.html` |
| `/consultation` | `consultation.html` |
| `/privacy` | `privacy.html` |
| `/projects/<slug>` | One generated page for every JSON record |
| `/api/careers.php`, `/api/contact.php`, `/api/quote.php` | PHP endpoints, not HTML routes |

There are eight normal public pages and 82 generated project pages. `project.html` is a build input, but its standalone output is removed after generating the detail pages. `/#studio` targets the homepage Studio section. `/quote?service=0` through `?service=4` map to service options in `src/quote.js`. The current script converts an absent/empty parameter to zero too; do not assume an unselected default.

Regular pages duplicate their header/footer HTML. Project pages obtain both from `index.html` during generation; the project header logo is replaced with the white logo. Editing one ordinary page does not update all other ordinary pages.

Global CSS defines `--paper`, `--ink`, `--muted`, `--border` and `--lime`. Manrope is fetched from Google Fonts; Arial/Helvetica fallbacks are used. Shared fill buttons use `.sprixo-fill-btn` with an inner `.sprixo-fill-btn__content`. Contact's three `.contact-link` links use a bottom border. Work's `#load-more` has scoped colors and a desktop transition.

### Environment requirements

- Development: Git, VS Code, npm, and Node satisfying Vite's installed engine range `^20.19.0 || >=22.12.0`. Choose a supported Node LTS within that range. The declared Vite dependency is `^8.3.5`; the lockfile controls the resolved installation.
- Production: root-domain static hosting plus PHP 8.1+ compatible with the Composer manifest, OpenSSL, working PHP sessions, outbound SMTP, HTTPS and Apache-compatible rewrite support. Composer is needed on a trusted packaging machine or hosting shell. Node is a build requirement, not a production server requirement.
- No database setup is required. **Requires verification:** actual hosting PHP version/extensions, session storage, outbound port access and `.htaccess` permissions.

## 2. Local development

1. Install the tools listed above. Open a terminal in the parent directory where you want the checkout.
2. Clone and open the repository:

   ```powershell
   git clone https://github.com/delightdesign2018-sketch/sprixo-website.git
   cd sprixo-website
   code .
   ```

3. In VS Code, choose **Terminal > New Terminal** and run:

   ```powershell
   npm ci
   npm run dev
   ```

4. Open the local URL Vite prints. Use Vite rather than `file://` or Live Server: the custom plugin provides development project routes.
5. Stop with Ctrl+C. For production output and static preview:

   ```powershell
   npm run build
   npm run preview
   ```

   Use the preview URL printed in the terminal. If preview does not resolve an extensionless project URL, open `/projects/<slug>.html`.

| Command | Purpose |
| --- | --- |
| `node --version`, `npm --version` | Check local tools |
| `npm ci` | Install locked dependencies |
| `npm run dev` | Development server |
| `npm run build` | Generate `dist/` and private example package |
| `npm run preview` | Serve built static output |
| `git status --short`, `git diff` | Review changes before commit |

`npm test` is a placeholder that exits with an error; there is no implemented test suite or lint script. Vite dev/preview do not execute PHP or reproduce Apache rewrite rules. Use PHP-capable staging hosting for real forms and production routing checks. Restart Vite after changing `data/projects.json`, because the plugin loads that data when it starts.

## 3. Add a portfolio project

### Automatic versus manual updates

| Item | Source | Behavior |
| --- | --- | --- |
| Detail name, category, industry, cover, copy, SEO | `data/projects.json` | Generated into detail HTML |
| Gallery | JSON `galleryHtml` plus physical public assets | Supply markup/files manually |
| Work cards and search terms | `work.html` | Not synchronized from JSON |
| Category buttons | `work.html` | Add manually for a new category |
| Live count | `src/work.js` | Automatically counts matching HTML cards |
| Intro and initial results text mentioning 82 | `work.html` | Update manually |
| Load More | `src/work.js` | Automatically handles cards in batches of 12 |
| Previous/Next | JSON array order | Generated, wrapping first/last |
| Homepage Selected Work | `index.html` | Maintained separately |

Current data contains 45 `Brand identity` and 37 `Logo design` entries. Category matching is case-sensitive.

### Example: Aster Coffee

1. Choose a unique slug, such as `aster-coffee`. Check JSON and Work links for collisions. Use lowercase letters and hyphens, and keep published slugs stable.
2. Export images yourself: no image processing script is supplied. Current listing images use WebP at 720 and 1440 pixels wide with a 4:3 presentation. Recommended listing exports are 720×540 and 1440×1080. A detail cover around 1920 pixels wide or larger is a recommendation, not a validation rule; check its full-height crop. Gallery images may retain their own ratio, commonly around 1440–1920 pixels wide where useful. Compress without losing readable design detail.
3. Add these proposed new files:

   ```text
   public/assets/listing/aster-coffee-720.webp
   public/assets/listing/aster-coffee-1440.webp
   public/assets/projects/aster-coffee-cover.webp
   public/assets/projects/aster-coffee-01.webp
   ```

   Existing files use names such as `project-01-720.webp` and `mount-01-720.webp`; no renaming is necessary. Keep new names lowercase and exact. `public/assets/...` becomes `/assets/...` in the browser, never `/public/assets/...`. WebP follows the existing portfolio convention; the renderer does not enforce extensions.
4. Insert this object in the array in `data/projects.json`. Add a comma between objects, with no trailing comma after the last object. This example needs the images above before it can work:

   ```json
   {
     "slug": "aster-coffee",
     "name": "Aster Coffee",
     "category": "Brand identity",
     "industry": "Food & beverage",
     "seoTitle": "Aster Coffee — Sprixo",
     "seoDescription": "Aster Coffee brand identity and packaging design by Sprixo.",
     "cover": {
       "src": "/assets/projects/aster-coffee-cover.webp",
       "alt": "Aster Coffee identity and packaging presentation"
     },
     "subtitle": "A warm identity for a contemporary coffee brand",
     "creditsHtml": "<span>Brand identity</span><span>Packaging</span>",
     "sourceHtml": "<p class=\"eyebrow\">THE PROJECT</p><p>Aster Coffee brand identity</p>",
     "overviewHtml": "<h2>Behind the identity</h2><p>Aster Coffee needed a welcoming visual identity for its cafe and retail coffee range. Sprixo developed a flexible logo, earthy palette and packaging system.</p>",
     "galleryHtml": "<figure><img src=\"/assets/projects/aster-coffee-01.webp\" alt=\"Aster Coffee bags and stationery\" width=\"1440\" height=\"1080\" loading=\"lazy\" decoding=\"async\"></figure>"
   }
   ```

   Use actual image dimensions. The `*Html` fields are inserted as raw HTML: use only reviewed owner-authored markup, escape quotes for JSON and never paste untrusted scripts. Add more `<figure>` elements inside `galleryHtml` for additional images. An empty gallery string omits the gallery section. `sourceHtml` may contain an approved external presentation link; retain `rel="noopener noreferrer"` with `target="_blank"`.
5. Do not create a separate source detail HTML file. The plugin renders this entry through `project.html` and `projects/template.cjs`, serves `/projects/aster-coffee` in development and emits `dist/projects/aster-coffee.html` at build. Do not edit generated files directly.
6. Insert this card inside `#portfolio-grid` in `work.html`, at its desired position:

   ```html
   <a class="project" href="/projects/aster-coffee"
      data-category="Brand identity"
      data-search="aster coffee food beverage brand identity packaging">
     <div class="project-image portfolio-preview">
       <img class="portfolio-slide"
            src="/assets/listing/aster-coffee-720.webp"
            srcset="/assets/listing/aster-coffee-720.webp 720w, /assets/listing/aster-coffee-1440.webp 1440w"
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1800px) 45vw, 800px"
            width="1440" height="1080" alt="Aster Coffee brand artwork"
            loading="lazy" decoding="async">
       <span class="project-open" aria-hidden="true">↗</span>
     </div>
     <div class="project-caption"><h3>Aster Coffee</h3><span>Food &amp; beverage</span></div>
   </a>
   ```

7. Existing categories need no extra filter. For a new category, add a matching button alongside the existing filters:

   ```html
   <button type="button" data-filter="Packaging" aria-pressed="false">Packaging</button>
   ```

   Use exactly `Packaging` in the relevant JSON/category attributes. Search reads `data-search` plus `data-category`, not JSON, captions or alt text. Include name, industry and useful terms explicitly.
8. Update the manual “82 projects to explore” intro and initial results count to 83. Runtime count updates automatically from HTML cards, including matches hidden beyond the visible limit. Load More reveals 12 more matches; filter/search changes reset to 12; reset clears category/search. No pagination API is involved.
9. Keep ordering intentional: Work follows HTML order, while Previous/Next follows JSON order and wraps. Reorder both when they should agree. Neighboring navigation regenerates on build.
10. To feature the project on the homepage, edit the Selected Work cards in `index.html`. Follow a neighboring homepage card, retaining its classes such as `portfolio-slide is-current`. JSON does not update the six current selections.
11. Restart development and check the new route, images, category, search and neighboring links. Use useful `seoTitle`, `seoDescription` and alt text. Ordinary fields are escaped; the renderer prefixes the project name if the SEO description omits it. Keep the generated high-priority detail cover eager and listing/gallery images lazy.
12. Build and publish updated output when ready. One added record should produce 83 detail pages. Update any separately maintained sitemap if one has been introduced.

Read-only data check from the repository root:

```powershell
node -e "const p=require('./data/projects.json'); console.log('Projects:',p.length); console.log('Unique slugs:',new Set(p.map(x=>x.slug)).size)"
```

Equal totals help identify duplicate slugs but do not validate fields/images. Compare Work card count too, and open the new links.

## 4. Forms and Hostinger SMTP

### Endpoints and recipients

| Form | Browser code | Endpoint | Recipient configuration |
| --- | --- | --- | --- |
| Careers | `src/careers.js` | `/api/careers.php` | Username, sender and recipient fixed as `work@sprixo.com`; password from config |
| Contact | `src/contact.js` | `/api/contact.php` | Required `contact_recipient` in config |
| Quote | `src/quote.js` | `/api/quote.php` | Required `quote_recipient` in config |

Contact/Quote use configurable `smtp_username` (default `work@sprixo.com`) and `smtp_from` (default username). The committed example has placeholder recipients. **Requires verification:** real production recipient values and mailbox delivery. Config changes do not change Careers' hardcoded addresses.

There is **no shared PHP email utility file**. Each endpoint contains its own validation and mailer logic; they share the private config and PHPMailer autoloader. A change to one handler does not update the others.

### Submission and validation

1. JavaScript GETs the endpoint for a CSRF token, using a same-origin session cookie.
2. Native HTML validity is checked on submit; the button is disabled and status/busy text shown.
3. The script POSTs JSON with `X-CSRF-Token` and boolean consent. This is not a conventional URL-encoded form submission.
4. PHP checks session/token, JSON content type, maximum 32 KiB body, field types and the empty `companyWebsite` honeypot.
5. Server limits: name 2–120 characters; valid email at most 254 bytes; optional phone at most 40 characters; message 10–4000 characters; consent strictly boolean `true`. Name/email/phone reject newline/NUL injection.
6. Contact/Quote service allowlist: `Logo Design`, `Branding`, `Print Media`, `Advertisement Designs`, `Website Design`. Careers additionally supports `Creative Direction`, `Client Relationship Executive`, `Other`, and uses `Print media` with lowercase “m”. Careers requires a valid HTTP/HTTPS portfolio/CV URL of at most 1000 characters; there is no file upload.
7. Five validated attempts per session per 15 minutes are allowed. Mail failures consume attempts too. This is not an IP/global limiter.
8. PHPMailer sends escaped HTML plus plain text; the visitor is Reply-To, not From. Success resets the form and rotates the token; the browser refreshes the token after each attempt.

No custom database, submission archive, durable retry queue or applicant/customer acknowledgement email is implemented. Emails are the records. JavaScript, PHP sessions and same-origin API access are required for the intended flow.

### Secure private deployment

For files in `public_html/api`, all three handlers resolve the following sibling directory:

```text
<domain-directory>/
  public_html/
    api/careers.php
    api/contact.php
    api/quote.php
  sprixo-private/
    config.php
    composer.json
    composer.lock       # retain after dependency resolution
    vendor/autoload.php
    vendor/...
```

1. Copy the structure of `server/sprixo-private/config.example.php` into private `config.php`. Never put real secrets in HTML, JavaScript, public files or Git.
2. Placeholder-only configuration structure:

   ```php
   <?php
   return [
       'smtp_password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
       'contact_recipient' => 'REPLACE_WITH_CONTACT_RECIPIENT_EMAIL',
       'quote_recipient' => 'REPLACE_WITH_QUOTE_RECIPIENT_EMAIL',
       'smtp_username' => 'REPLACE_WITH_AUTHENTICATED_MAILBOX_EMAIL',
       'smtp_from' => 'REPLACE_WITH_AUTHENTICATED_MAILBOX_EMAIL',
   ];
   ```

   For the existing Careers handler, credentials must correspond to its fixed `work@sprixo.com` mailbox. Changing that mailbox requires a separate code change, not just this configuration.
3. Implemented SMTP settings are **`smtp.hostinger.com`, port 465, implicit TLS/SMTPS**, SMTP authentication, UTF-8 and a 20-second timeout. Use the mailbox password, not the hosting-account password. Host/port/encryption are hardcoded in handlers, not configurable keys. Port 587/STARTTLS is an alternative only after provider/account verification and coordinated code changes; changing an invented config key will not switch it. Never disable certificate verification as a workaround.
4. The Composer manifest requires PHP `^8.1`, `ext-openssl` and `phpmailer/phpmailer` `^6.9`. On a trusted machine with PHP and Composer:

   ```powershell
   cd server/sprixo-private
   composer install --no-dev --prefer-dist --optimize-autoloader
   cd ../..
   ```

   No Composer lockfile was present in this source directory during inspection. First installation resolves versions and creates one; retain/review it for repeatable subsequent deployments. Do not bypass platform requirements.
5. Upload the entire resulting `vendor/`, manifest and lockfile to private `sprixo-private/`, alongside `config.php`. Alternatively run Composer in that server directory if supported. Verify PHP can read `vendor/autoload.php`.

The Vite build creates `dist-private/` with **only** `composer.json` and `config.example.php`. It does not install PHPMailer or package real config/vendor. Uploading that directory alone cannot enable forms. Keep private packages outside the web root.

### Testing and troubleshooting

On HTTPS PHP-capable staging hosting, submit clearly labelled synthetic data through each page. Check both on-page success and actual inbox receipt; verify Reply-To, Careers URLs, required consent, invalid fields and a second submission. Do not use private applicant data for tests or share CSRF/session values.

| Symptom | Check |
| --- | --- |
| PHP source displayed/downloaded | Hosting does not execute PHP; do not use that deployment for forms |
| 403 | Session cookie/token, HTTPS detection, blocked cookies; reload/retry |
| 415 | POST must be JSON from the implemented script |
| 413 / 422 | Body size, field lengths, exact service allowlist, consent, URL and honeypot |
| 429 | Wait 15 minutes and investigate repeated attempts |
| 503 | Session storage or missing private config/autoload; check sibling path and permissions |
| 502 | Password, valid recipient, authenticated sender, OpenSSL/TLS and outbound port 465 |
| Invalid JSON/connection error | Wrong endpoint, PHP warning/HTML error, static hosting or network failure |
| Success but no inbox delivery | Recipient spelling, spam/quarantine, quota, provider delivery logs and domain email authentication |

Use hosting/PHP logs. Handlers intentionally log brief failure types, not raw SMTP diagnostics or applicant content. Never leave public debug output enabled. Verify SPF/DKIM and applicable DMARC using the mailbox provider's supplied records; do not invent DNS values or duplicate SPF records. SMTP acceptance is not guaranteed inbox placement.

## 5. Cal.com consultation booking

`consultation.html` loads `https://app.cal.com/embed/embed.js`, initializes namespace `one-on-one`, and embeds `admin-delight-pfrpnp/one-on-one` in `#my-cal-inline-one-on-one`. Its public event path is `https://cal.com/admin-delight-pfrpnp/one-on-one`. Settings include light theme, `month_view`, small-screen slots and forwarded query parameters. There are no local booking handlers or Cal.com API secrets.

### Change event URL

1. Find the intended event in the owner's Cal.com account and copy its public `username/event-slug` path.
2. Replace the `calLink` string in `consultation.html`.
3. Namespace/container names need not change. If renamed, update all initialization, `Cal.ns` calls, selectors and related CSS together.
4. Verify the public event works, then build/publish the website.

### Account operations — Requires verification

These settings cannot be confirmed from the repository. Dashboard labels/features depend on the current account and plan; this checklist does not claim they are already enabled.

1. Open the event type. Set duration, availability schedule, weekly hours, date overrides and timezone.
2. Locate scheduling/limit controls. Set minimum notice, future booking window, buffers and daily/weekly booking limits as needed; save and test a visitor booking.
3. Locate manual confirmation/approval, often labelled “Requires confirmation” or similar. Enable it if approval is needed. Submit a test and confirm it becomes pending, with the expected host notification. Submission is not proof of approval.
4. Locate attendee email verification if available for the account/event. Enable and test it separately from manual approval. If unavailable, verify account/plan support before promising this behavior.
5. In the booking dashboard, find pending/upcoming bookings. Use available controls to approve/reject pending requests and cancel confirmed bookings; verify attendee notification. Check the account's treatment of pending/declined time slots.
6. Connect Google Calendar through calendar integrations, grant appropriate access, select conflict-checking calendars and the calendar where bookings are created. Busy events can remove slots. Verify this event uses the intended calendars and timezone; expired authorization or incorrect selections can change availability.

Cal.com and connected providers hold booking records, approval states, notifications and calendar events. No local booking database is needed. Back up account settings separately from Git.

### Troubleshooting

- No slots: check schedule, timezone, overrides, busy calendar events, duration, buffers, minimum notice, booking window and limits. Test the event directly to distinguish account settings from embed issues.
- Blank embed: check `calLink`, network access, script blockers and browser errors; open the public event directly.
- Layout problems: existing inline CSS constrains container/iframe width to 100% and uses `min-width: 0`; the main layout becomes one column at 1440px with mobile adjustments at 750px. Inspect these rules before editing. Cross-origin iframe internals cannot be freely styled with local CSS; use supported embed settings.
- Query parameters: forwarding is enabled. Avoid confidential data in shared consultation URLs and verify how the provider handles forwarded fields.

## 6. Hostinger deployment walkthrough

### Prepare and build

1. Confirm the domain's actual document root and PHP support. This guide assumes root-domain `public_html`, not a subfolder; root-relative asset links depend on that arrangement.
2. Back up existing public files including hidden `.htaccess`, plus private config/dependencies. Store private backups outside public directories. Record the current commit, PHP version, DNS settings and release time.
3. Keep a known working build and protected private-package backup. Website rollback does not undo sent email or Cal.com account changes.
4. From the intended checkout:

   ```powershell
   npm ci
   npm run build
   ```

5. Inspect output: eight regular HTML pages, `projects/<slug>.html` for all JSON records, bundled JS/CSS under `assets/`, copied public images, `preloader.js`, `preloader.css`, `.htaccess`, and `api/*.php`. `dist-private/` holds templates only. An old existing `dist/` is not proof of a successful current build.

### Upload using File Manager or FTP

1. In Hostinger File Manager, open the correct domain's `public_html` and enable hidden-file display.
2. Upload the **contents** of `dist/`, not the outer folder. The result must be `public_html/index.html`, not `public_html/dist/index.html`. If using a ZIP, check extraction paths and remove the uploaded archive afterward.
3. Alternatively use the account-provided FTP client settings. Prefer SFTP if available or FTPS where supported. Obtain the exact host, port and document root from hPanel rather than guessing. Preserve directories and filename case.
4. Confirm all three PHP files reached `public_html/api/`; uploading only frontend files breaks forms.
5. Deploy sibling `sprixo-private/config.php` and complete Composer dependencies as described above. It must be outside `public_html` and readable by PHP. If hosting restrictions prevent that access, resolve the path/hosting limitation before launch; do not move credentials into public files.
6. Do not upload `.git`, `node_modules`, source checkout, `.env`, private backups, real config or `dist-private/` into the public tree. Give private files only the owner/runtime access needed; never make them world-writable. Exact ownership/permissions require hosting verification.

### Domain, DNS and HTTPS — Requires verification

1. Add/select the domain in hPanel and verify it maps to this document root.
2. At the authoritative DNS provider, use Hostinger's supplied nameservers or website A/AAAA/CNAME values. Record existing DNS first and preserve email MX/SPF/DKIM/DMARC records.
3. After DNS resolves to the intended site, enable its SSL certificate and verify HTTPS. Enable the hosting HTTPS redirect if required: the committed `.htaccess` does not contain an HTTP-to-HTTPS redirect.
4. Choose the preferred apex/www hostname and verify redirect/certificate coverage. The repository does not establish the live canonical hostname or DNS values.

### Extensionless URLs

`public/.htaccess` is copied to `dist/.htaccess`. It disables MultiViews, sets `index.html` as directory index, and:

- Leaves `/api` and `/assets` untouched.
- Redirects explicit `/index.html` requests to `/`.
- Redirects explicit existing `.html` requests, including nested projects, to clean URLs. Original-request checks prevent internal rewrite loops.
- Removes applicable page trailing slashes without changing real directory URLs.
- Internally serves existing `.html` files for extensionless URLs, retaining query strings.

There is no generic SPA fallback. Preserve nested `projects/`, asset paths, endpoint extensions and query parameters. Do not replace this with a rewrite-everything-to-index rule. Apache rewrite support must be verified on the host; Vite preview and `vercel.json` are not substitutes.

### Updates and rollback

1. After publishing, directly load/reload normal and nested project URLs. Check `.html` redirects, `/quote?service=2`, actual API responses and static assets.
2. Verify forms by actual email delivery, booking end to end and portfolio controls. Use the launch checklist below.
3. For updates, back up again and build from the intended commit. Upload new hashed assets before HTML where practical. Retain old hashed assets briefly if cached pages reference them. Copying files does not remove retired pages; identify obsolete files and arrange redirects before removing them.
4. Exclude real private config from static upload/synchronization. Do not replace it with the example. Update private dependencies deliberately with a matching rollback copy.
5. If verification fails, restore the previous public release including `.htaccess`, plus any changed private package/config. Recheck assets, a nested route and email delivery. Restore DNS only if it changed and the previous destination is still usable.

## 7. Website maintenance

### Content, styling, navigation and footer

1. Edit ordinary page copy in its root HTML file; detail copy in JSON.
2. Use global `src/style.css`, form `src/careers.css`, Quote `src/quote.css`, and detail `src/project.css` appropriately. Consultation and Privacy also have inline styles. Scope changes with existing page classes.
3. Preserve IDs, field names, data attributes and selectors unless updating their consumers deliberately.
4. Update duplicated regular-page headers/footers consistently. `index.html` supplies generated project layout at build time. Preserve active-page attributes, mobile menu wiring and external-link safety attributes.
5. Review the diff, check locally and build/publish; editing local source does not update production automatically.

### Images, favicon and logos

Runtime files belong in `public/assets/` and use `/assets/...` browser references. Reuse a filename only when replacing every reference intentionally; otherwise choose a unique name. Update real dimensions, alt text and all `srcset` variants. Case errors can work on Windows but fail on Linux hosting.

Favicon: `/assets/sprixo-icon.svg`, referenced by normal page heads and the project template. Logos include `/assets/sprixo-logo.png` and `/assets/sprixo-logo-white.png`; the preloader separately uses the standard logo. Check all uses after branding changes. Public assets keep their names, so browser/CDN caches may need refresh or a new filename.

### WhatsApp

Edit `whatsappNumber` and `whatsappMessage` in `src/main.js`. Use international digits only, without `+`, spaces or punctuation. The message is URL-encoded into a `wa.me` link. An invalid number produces a disabled link. Verify ownership of the configured number, rebuild, and test destination/message on phone and desktop.

### SEO

- Ordinary `<title>` text lives in each page head. Project titles/descriptions come from JSON and `project.html`.
- Only the project template contains a meta description in inspected HTML. Ordinary-page descriptions, canonical tags and social-preview metadata were not implemented; the build does not generate them automatically.
- No `robots.txt` or sitemap was present in `public/`; there is no generator. In a future authorized addition, use `public/robots.txt` and `public/sitemap.xml` with the verified HTTPS production hostname and intended clean routes. These are proposed paths, not existing files. Maintain the sitemap when adding/removing projects.
- Renaming a JSON slug does not generate a redirect from the old route.

### Lazy loading, Load More and dependency updates

Keep listing `srcset`/`sizes`, lazy loading and async decoding. Gallery images should be lazy; the first detail hero stays high-priority. Load More hides existing DOM cards rather than fetching more data; it does not guarantee hidden images are never requested. Large assets still affect performance.

For future dependency changes, start from a backed-up branch, review `npm outdated`, update deliberately, inspect manifest/lockfile changes, build and manually verify affected flows. Avoid forced blanket upgrades. PHP dependencies are separate: review Composer changes/advisories, retain its lockfile, verify PHP/OpenSSL compatibility and stage-test SMTP before replacing production `vendor/`. None of these installation/update steps was performed for this document.

| Problem | Checks |
| --- | --- |
| Broken project route | Unique JSON slug, matching card href, restarted dev, rebuilt/generated file uploaded |
| Missing image | Physical file, `/assets/` path, exact case, all responsive variants uploaded |
| Old CSS/image | Correct build uploaded, requested path, browser/CDN/host cache; hard refresh or new asset name |
| Clean URL 404 | Hidden `.htaccess`, correct root, rewrite support, matching HTML file |
| Nested route loses assets | Root-relative paths in custom raw HTML and actual network requests |
| Build fails | Compatible Node, locked install, JSON syntax/escaping, imported files; start with first real error |
| Dev port occupied | Stop old process or use actual port Vite prints |
| JSON edit absent | Restart Vite; rebuild instead of editing stale output |
| Form fails locally | Vite cannot execute PHP; test on PHP-capable staging |
| Loading overlay persists | Check preloader script/style requests; current script includes a 10-second fallback and removal safety timer |

## 8. Security and operations

- `.gitignore` excludes dependencies, `dist/`, `dist-private/`, `.env`/`.env.*` except `.env.example`, real `server/sprixo-private/config.php`, private `vendor/`, screenshots/logs and editor files. Ignoring a path does not untrack previously committed secrets. Review diffs; rotate exposed credentials and handle history separately.
- PHP handlers do not automatically read `.env`. Their source of SMTP settings is private PHP config. Frontend build variables are not secret storage.
- CSRF, session cookies, honeypot, validation and session attempt limits are implemented. Cookies use HttpOnly/SameSite Strict and Secure when HTTPS is detected. Verify host HTTPS detection/session storage. No CAPTCHA, centralized abuse limit or durable retry queue is implemented; new sessions can evade a session-only limit.
- Ordinary project text is escaped, but raw `*Html` fields are not sanitized. Keep them trusted and reviewed.
- Preserve HTTPS, authenticated encrypted SMTP and restrictive private file access. Never leave debug credentials/content in public output or issues.
- Restrict GitHub, hosting, mailbox and Cal.com access; use unique passwords and multifactor authentication where available. Keep protected source, release, private config/dependency and account-setting backups, and test restoration.
- No custom database does not mean no retained personal data: mailboxes, linked CV providers, Cal.com, calendars, logs and backups may retain records. Define access, retention/deletion and backup policies. Avoid applicant data in troubleshooting logs.
- `privacy.html` has unresolved owner-confirmation items for integrations, inbox access, retention, tracking/hosting, business identity and rights handling. Confirm these operational facts before treating it as a completed business policy.

### Known limitations / Requires verification

1. Real SMTP config, recipients, DNS authentication, delivery, PHP permissions and hosting setup were not verified.
2. Cal.com approval, email verification, availability, calendar integrations and feature/plan availability are account settings, not proven by the embed.
3. Static-only hosting does not execute these PHP forms; `vercel.json` does not add that capability.
4. No automatic Work/homepage synchronization, image processing, sitemap generation or working automated test suite exists.
5. Duplicated regular-page layouts and independent JSON/card orders need coordinated maintenance.
6. No upload handler, custom submission database, durable mail retry or acknowledgement email exists.
7. Review accuracy and publication permissions for portfolio content and any replacement material.
8. Hover gating is not uniform: shared fill hover uses a comma-separated media query; global touch handling primarily suppresses motion, not all colors. Quote's consultation button and Work Load More have scoped handling. Do not claim site-wide touch color suppression without device verification.
9. Live SSL, canonical-host redirects, caching and backups remain unverified. This guide did not inspect production.

## 9. Final launch checklist

### Build and source

- [ ] Review intended commit/diff and confirm no credentials or unrelated changes.
- [ ] Use compatible Node; run `npm ci` and a successful `npm run build` when preparing release.
- [ ] Confirm eight normal pages and 82 generated project pages, adjusting expected totals for additions.
- [ ] Confirm placeholder standalone `project.html` is not published as a finished page.
- [ ] Include `.htaccess`, APIs, public assets and separately packaged private dependencies.

### Pages and projects

- [ ] Open all main/footer links and all 82 `/projects/<slug>` routes directly and by navigation.
- [ ] Check titles, covers/gallery, category/industry, source links and Previous/Next wraparound.
- [ ] Check Work filters, live search, no-results reset, counts and every Load More batch.
- [ ] For new work, verify unique JSON entry, real images, manual card/search data, intro count and optional homepage feature.
- [ ] Confirm Work and JSON order are intentional.

### Forms and bookings

- [ ] Keep real config outside `public_html`; confirm readable `vendor/autoload.php`.
- [ ] Verify Contact/Quote recipients and Careers fixed mailbox.
- [ ] Test all three forms using synthetic data, actual receipt and Reply-To.
- [ ] Test required fields, portfolio URLs, consent and failure messages.
- [ ] Complete a Cal.com test booking in the intended timezone.
- [ ] Verify required manual confirmation/email verification and approve/reject/cancel notifications.
- [ ] Check Google Calendar conflict detection and booking creation.

### Presentation, SEO and hosting

- [ ] Check mobile/tablet/desktop layouts, mobile menu, keyboard focus, form statuses and image overflow/crop.
- [ ] Check hover/touch and reduced-motion behavior for changed controls.
- [ ] Verify titles, project descriptions, favicon and any separately added SEO metadata.
- [ ] Record whether robots/sitemap remain absent or have been deliberately implemented and verified.
- [ ] Verify WhatsApp destination and prefilled message.
- [ ] Confirm DNS, document root, valid SSL, HTTPS redirect and preferred hostname.
- [ ] Test extensionless/nested routes, `.html` redirects, preserved queries, API and asset access.
- [ ] Confirm no credentials/source archives/private backups are publicly accessible.
- [ ] Back up public/private release files and record the previous version.
- [ ] Upload `dist` contents without overwriting real private configuration.
- [ ] Verify production and retain a known working rollback package.
- [ ] Record owner privacy/access/retention decisions and external account settings separately from Git.
