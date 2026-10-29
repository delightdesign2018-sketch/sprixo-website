# Sprixo Branding Studio — Phase 1 website audit

Audit date: 29 October 2026 (IST). Reference: https://sprixo-branding-studio.delight-hjv.chatgpt.site/

## Scope and evidence

This is analysis only. No application, Vite configuration, dependencies or production assets were installed or implemented. The project folder was empty when inspected; no local AGENTS.md was found.

The web reader could not access the reference. Direct HTTP requests succeeded after network permission. The audit reads the actual published HTML, CSS and JavaScript, not remembered designs. All 90 discovered public HTML documents returned HTTP 200: eight main documents and 82 project documents. The root URL also returned HTTP 200. robots.txt and sitemap.xml were read. Styles and scripts were read in full, including later overrides. Temporary reference downloads are outside this project, in the operating system temporary directory under `sprixo-phase1-reference`.

**Verification boundary:** no rendered browser session was available for this audit. Layout and interaction descriptions below are derived from published source; browser execution, visual fidelity, font delivery and touch behavior are not verified. HTTP 200 does not prove a visually correct render. The source inventory and image checks appear below.

## Homepage: exact section order

1. Skip-to-content link, then header: full Sprixo logo; Work, Services, Studio (`index.html#studio`), Careers, and outlined pill Get a quote.
2. Hero (`#home`): eyebrow “BRANDING & GRAPHIC DESIGN STUDIO”; heading “Made to / stand out.” The second line uses italic serif type. Two tilted brand artwork images (Bunny Cafeteria behind Voltexa), lime circle and decorative asterisk sit to the right. Bottom divider precedes “We turn who you are into / a brand people feel.”, Explore the work linking to `#work`, and Rajkot location copy. The artwork label exists in HTML but is hidden by CSS.
3. Dark moving service strip: Branding, Logo Design, Packaging, Stationery, Creative Direction, Social Media, separated by lime asterisks; duplicated group for looping; Pause/Play button.
4. Selected work (`#work`): “Distinct brands. / Lasting impressions.” and supporting copy. Six projects in this order: RXIOM Logistics, Cessa Fashion, Voltexa, Bunny Cafeteria, Axiron, LIFETIMEPIECES. Two-column cards on desktop, grayscale artwork, titles and industries. “Explore all 82 projects” links to `work.html`.
5. Studio (`#studio`): panel background; “Many perspectives. / One shared purpose.”; large “15–16” team count; studio description and Dribbble link. This is an anchor section, not a separate Studio page.
6. Expertise (`#expertise`): “One vision. / Every touchpoint.” and six native details/summary accordions: Branding & strategy; Logo & visual identity; Packaging & stationery; Creative direction; Social media & graphic design; Web & visual design.
7. Dark footer: “GREAT BRANDS START WITH / A DIFFERENT KIND OF THINKING.”; Explore all projects; very large inverted Sprixo logo; copyright 2026, discipline, Rajkot location; Contact, Book a consultation, Careers, Privacy and conditional Analytics settings.
8. Conditional analytics preference overlay; conditional WhatsApp link injected by JavaScript when configuration supplies a number.

No standalone homepage contact form, testimonial section or separate contact CTA section occurs in this published homepage.

## Main routes and content

All paths are relative to the reference origin. Preserve `.html` URLs for simple shared hosting; query strings and anchors are significant.

| Route | Published content |
| --- | --- |
| `/`, `/index.html` | Homepage described above; title “Different by design — Sprixo” |
| `/work.html` | Portfolio introduction, category filters, live search, count, 82 cards, no-results message and reset |
| `/services.html` | Intro “From first idea / to every detail.”; five alternating copy/artwork panels: Logo Design, Branding, Print Media, Advertisement Designs, Website Design |
| `/quote.html` | Project brief form and consultation link; “Tell us what / you have in mind.” |
| `/quote.html?service=0` through `4` | Preselects one of the five service options in the above order |
| `/contact.html` | “A good brand starts / with a conversation.”; Rajkot, Mon–Sat 10am–6pm IST; configuration-driven email, consultation and Dribbble links; enquiry form |
| `/consultation.html` | “Make time for / your next idea.”; date/time picker and booking form |
| `/careers.html` | “Good people. / Better together.”; open applications, expressly no promise of a vacancy; role selector and portfolio/CV URL |
| `/privacy.html` | Enquiries/applications, storage/access, analytics and user choices; describes hosted database and private backups |
| `/projects/*.html` | 82 individual case studies; full-viewport cover, project title/category/subtitle, source credit/link when present, overview, optional gallery, previous/next navigation and shared footer |

Services imagery: `assets/projects/cover-02.webp` (Securis), `cover-06.webp` (Anvira Finery), `cover-24.webp` (Bone Appetit Bakery), `cover-17.webp` (Brontide), and `assets/sprixo-website-preview.webp`. Service links select quote options 0–4 respectively.

## Design system from the published cascade

CSS loads in order: `gallery.css`, `launch.css`, `restored-sections.css`. The last file overrides older hero/footer/header rules. Cache query `portfolio-light-theme-only-20261029` appears on the main stylesheet and script. Do not copy obsolete base rules without applying the overrides.

| Token / role | Value |
| --- | --- |
| Paper / page background | `#f7f7f2` |
| Ink / main text / dark panels | `#20211e` |
| Muted text | `#62645c` |
| Borders | `#d6d7cf` |
| Lime accent | `#d2f85a` |
| Panel | `#edeee7` |
| Restored footer text / muted / border | `#eeeee8` / `#babdb0` / `#55574e` |
| Form error | `#a12917`; conditional dark-preference override `#ffaaa0` |
| Main easing | `cubic-bezier(.23,1,.32,1)` |
| Horizontal gutter | `clamp(20px,4.2vw,80px)` |
| Section padding | `clamp(60px,7vw,110px)` vertically; gutter horizontally |
| Content max width | `1800px`, centered |

The page explicitly declares light color scheme. A dark system preference does not supply a complete dark theme.

Typography: Google Fonts CSS imports Manrope weights 400, 500, 600, 700. Headings use Manrope/Arial, weight 500, line-height 1.08 and tracking -0.055em; h2 `clamp(38px,4.7vw,72px)`, h3 `clamp(22px,2vw,30px)`. Body is Arial/Helvetica/sans-serif, 17px/1.6. Eyebrows are 12px, weight 600, tracking .08em. General `em` is upright muted text; only restored hero emphasis explicitly uses Georgia/Times New Roman italic, weight 400. Hero h1 is `clamp(80px,9.5vw,170px)`, tracking -.075em, line-height 1.02, with emphasis 1.08 times the heading size.

Header padding: 25px vertically; final full logo width 170px desktop and 150px at <=650px. Footer logo uses full supplied image, no header crop. Logo source declares 2248×822 pixels. Cards use 4:3 frames, 8px corners, cover fit and top alignment; caption padding 18px. Grid gaps 55px vertically/28px horizontally; archive 45px/25px. Buttons are outlined rounded pills with minimum 48px height; fields use 8px corners, 13px/14px padding and minimum 48px height. Many navigation controls have a 44px minimum height.

## Responsive layouts from media queries

| Boundary | Source-defined change |
| --- | --- |
| >=1600px | Restored hero minimum height 780px, artwork height 560px, lime circle 470px |
| <=1100px | Booking calendar/time panel becomes one column; time options use three columns |
| <=1050px | Service panels change from label/copy/image to two columns with label across the top |
| <=1000px | Hero minimum 625px, heading 10vw, repositioned artwork and smaller circle |
| <=900px | Project captions stack; work toolbar stacks with full-width search; section layouts tighten |
| <=750px | Form and booking layouts become one column; paired fields stack; navigation wraps; smaller intro type |
| <=700px | Services become one column, normal copy/image order, 48px vertical panel padding |
| <=650px | Header wraps into logo/navigation rows; portfolio becomes one column with 35px gaps; studio/expertise stack; hero heading 19vw and artwork enters normal flow (90% width, 315px height); location hidden; smaller arrow; footer middle descriptor hidden |
| <=500px | Booking picker tighter; time options return to two columns |

Desktop hero artwork is absolutely positioned, 44% width, right 2%, with rotated layered images. Mobile artwork follows the heading. Desktop studio is two equal columns with 10% gap; expertise similarly splits heading and accordion. Case study overview uses 1:2 columns, becoming one column at <=650px. Rendered checks at narrow widths remain necessary; no hamburger menu is defined.

## Interactions and motion

- Smooth anchor scrolling only when reduced motion is not requested. Skip link appears on focus; 3px focus outlines and screen-reader labels are present.
- Hero artwork hover (fine pointer): front rotates -11° to -6° and rises 12px; back rotates 12° to 8° and rises 10px; transition .7s. Explore circle moves down 3px and fills lime.
- Ticker animation: 38-second linear infinite translation -50%; button changes paused state, label and aria-pressed. Reduced motion stops looping, wraps the service text, hides duplicate group and toggle.
- Portfolio thumbnails: grayscale(1) to color on hover or keyboard focus, 220ms. Final CSS forces arrow visible. HTML includes data-carousel URLs and an extra image, but the inspected scripts do not implement a cycling slideshow. Do not infer one from attribute names.
- Reveal targets use IntersectionObserver threshold .08; once visible, opacity and 8px upward offset transition over 600ms. Reduced-motion and unsupported-browser paths expose the content directly.
- Native accordions expand independently; plus rotates 45° when open.
- Work search matches lowercased name/industry/category metadata, combined with All work / Brand identities / Logo studies filters. Updates hidden cards, live count and empty state; reset clears both and returns focus to search. Toolbar is initially hidden until script initialization.
- Buttons scale to .97 on active; hover fills lime where specified. Fine-pointer navigation/text links underline. Service artwork enlarges to 1.025 over 300ms.
- Case hero is sticky within `calc(max(100svh,620px) + 28svh)` scene. Scroll beyond 16px condenses the image using a calculated 4:3 clip frame and scale(.92); 620ms transition. Cover uses cover fit/top positioning and gradient overlay. Header is absolute over the image with white logo/text. Small-screen hero minimum height is 620px. Reduced motion removes cover transitions.
- Booking calendar supplies month navigation, disabled days/times, selected state, loading/error feedback, and an enabled submit only after choosing a slot.
- Form submissions use native validity reporting followed by JSON fetch; button shows Saving, inline success/error, reference code, resets after success. Booking conflict HTTP 409 reloads availability; successful booking offers a client-generated `.ics` calendar file.
- Analytics consent is stored in localStorage under `sprixo-analytics`; Google tag script loads only if analytics is configured and consent is yes. Settings can reopen the panel; declining after load disables analytics and reloads.

These behaviors were inspected in source, not triggered in a browser. No enquiry/application was sent and no booking or cancellation was made.

## Forms and backend migration requirements

Common required inputs: name (2–120 characters), email (up to 254), service, message (10–4000), explicit privacy consent. Optional phone up to 40 characters. Hidden `companyWebsite` honeypot is present. Careers adds a required URL (`portfolio`, up to 1000 characters), not a file upload; role selector also includes Creative Direction, Client Relationship Executive and Other. Form kinds are `contact`, `quote`, `career`, `consultation`.

Published `launch.js` depends on:

| Endpoint | Observed client contract / audit boundary |
| --- | --- |
| `GET /api/config` | Optional analyticsId, whatsapp, email; controls conditional UI |
| `GET /api/availability?date=YYYY-MM-DD` | JSON slots containing slot, label, available |
| `POST /api/enquiries` | JSON form data plus kind, UUID id and boolean consent; response reference and optional slot; errors may return error; 409 booking conflict |
| `GET /api/admin` | Admin-only records expected by dormant client code; not requested |
| `POST /api/admin/cancel` | Admin cancellation expected by client code; not invoked |

Client booking rules: 30-minute slots, Monday–Saturday; starts at 10:00–12:30 and 15:00–17:30 IST; closed Sundays and 13:00–15:00; minimum 18-hour notice, maximum 90-day window. Server must independently enforce these and prevent concurrent double booking. UUID is reused for a failed attempt and renewed after success, suggesting an intended idempotency contract; server enforcement cannot be confirmed from client source.

Static HTML/CSS/JS can host the presentation, but cannot replace this persistence/availability behavior alone. A later PHP backend on Hostinger is a proposed migration, not a confirmed requirement of the original technology. Plan validation, honeypot/rate limits, idempotent persistence, atomic slot reservation, authenticated admin access if retained, protected backups and optional email notifications. SMTP credentials, recipient, storage choice and retention remain undecided. Existing privacy copy promises database storage and backups; reconcile the new implementation with that promise. No payment, account signup or attachment-upload requirement was found.

Server code, database schema, actual persistence, mail delivery, private admin records and backup arrangements were not accessible from public source. API paths are disallowed in robots.txt; live API calls were not made during this crawl. Do not describe the APIs as working solely from their presence in JavaScript.

## Assets and content provenance

Published image paths group into `assets/listing/` (720/1440 responsive thumbnails), `assets/originals/` (full project art), `assets/projects/` (covers/gallery art), logo PNGs, SVG favicon and website preview. Homepage hero uses `assets/projects/cover-08.webp` and `cover-01.webp`, both declared 1536×1024. Listing cards declare 1440×1080 and supply 720w/1440w candidates; sizes text switches at 700px even though the grid breakpoint is 650px. Preserve this distinction until visually checked.

Project credits include Artrends and MountDesign portfolio sources and outbound Fiverr links; studio links to https://dribbble.com/Sprixo. External portfolio pages were not audited as internal pages. Preserve credits and confirm the supplied artwork's reuse rights; original editable design files and font binaries were not obtained. Asset paths and project-specific mappings are recorded in the generated inventories below.

## Access limitations and material needed

- All 90 linked public HTML documents were readable; no discovered public HTML page failed. Unlinked pages cannot be ruled out. `admin.html` is mentioned by robots.txt and was deliberately not accessed; no authentication bypass was attempted.
- CSS/JS were readable. Google Fonts delivery and external Dribbble/Fiverr destinations were not verified. Hostinger account configuration and PHP/mail/database capabilities were not inspected.
- No browser screenshots, computed-style measurements, interaction recordings or rendered responsive comparisons were captured. Source-defined colors and spacing are exact declarations, not screenshot estimates.
- Before visual sign-off, obtain full-page desktop homepage/work/services screenshots around 1440px, mobile screenshots around 390px for each main page and one brand/one logo project, plus hover/scroll recordings for hero, project cards and case cover. Show expanded accordion, filter/search/no-results, calendar selection and form success/error states where possible.
- Original logo, full-resolution portfolio artwork and any brand/font package would help preserve image fidelity. Provide confirmed public email/WhatsApp, submission recipient and booking/admin expectations for the later backend phase. Never supply passwords or private enquiry records as audit assets.


## Complete portfolio inventory

Rows preserve the published work-page order. Each project document was fetched and its title, cover, overview/gallery structure and navigation were inspected programmatically. Paths resolve against the reference origin. All listed project documents returned HTTP 200. Cover/gallery mappings come from each case page, not inferred filenames.

| # | Project / industry | Page | Case artwork paths | Content structure |
| --- | --- | --- | --- | --- |
| 1 | ↗ Voltexa AI technology | [projects/voltexa.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/voltexa.html) | `assets/originals/artrends-01.webp`<br>`assets/projects/project-01-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 2 | ↗ Securis Cybersecurity | [projects/securis.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/securis.html) | `assets/originals/artrends-02.webp`<br>`assets/projects/project-02-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 3 | ↗ Anvira Finery Fine jewellery | [projects/anvira-finery.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/anvira-finery.html) | `assets/originals/artrends-06.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 4 | ↗ Corasol Technology | [projects/corasol.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/corasol.html) | `assets/originals/artrends-07.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 5 | ↗ Bunny Cafeteria Food & beverage | [projects/bunny-cafeteria.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/bunny-cafeteria.html) | `assets/originals/artrends-08.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 6 | ↗ Zebron SaaS | [projects/zebron.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/zebron.html) | `assets/originals/artrends-09.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 7 | ↗ BRIKON Construction | [projects/brikon.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/brikon.html) | `assets/originals/artrends-10.webp`<br>`assets/projects/project-10-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 8 | ↗ Lumora Real estate | [projects/lumora.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/lumora.html) | `assets/originals/artrends-11.webp`<br>`assets/projects/project-11-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 9 | ↗ FreeValue Financial services | [projects/freevalue.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/freevalue.html) | `assets/originals/artrends-12.webp`<br>`assets/projects/project-12-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 10 | ↗ TheHive Automotive | [projects/thehive.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/thehive.html) | `assets/originals/artrends-13.webp`<br>`assets/projects/project-13-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 11 | ↗ Palmira Resort Hospitality | [projects/palmira-resort.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/palmira-resort.html) | `assets/originals/artrends-14.webp`<br>`assets/projects/project-14-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 12 | ↗ Elite Craft Construction | [projects/elite-craft.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/elite-craft.html) | `assets/originals/artrends-15.webp`<br>`assets/projects/project-15-2.webp`<br>`assets/projects/project-15-3.webp`<br>`assets/projects/project-15-4.webp`<br>`assets/projects/project-15-5.webp` | Behind the identity; 4 gallery figures; 1 navigation block |
| 13 | ↗ Flyzo Transport Transport & logistics | [projects/flyzo-transport.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/flyzo-transport.html) | `assets/originals/artrends-16.webp`<br>`assets/projects/project-16-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 14 | ↗ Brontide Electric mobility | [projects/brontide.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/brontide.html) | `assets/originals/artrends-17.webp`<br>`assets/projects/project-17-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 15 | ↗ Lunaleaf Wellness Wellness & skincare | [projects/lunaleaf-wellness.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/lunaleaf-wellness.html) | `assets/originals/artrends-18.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 16 | ↗ Vezora Yoga & wellness | [projects/vezora.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/vezora.html) | `assets/originals/artrends-19.webp`<br>`assets/projects/project-19-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 17 | ↗ Quanthex Software & technology | [projects/quanthex.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/quanthex.html) | `assets/originals/artrends-20.webp`<br>`assets/projects/project-20-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 18 | ↗ Scenery Art Gallery Art & culture | [projects/scenery-art-gallery.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/scenery-art-gallery.html) | `assets/originals/artrends-21.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 19 | ↗ TRIVON Automotive Automotive | [projects/trivon-automotive.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/trivon-automotive.html) | `assets/originals/artrends-22.webp`<br>`assets/projects/project-22-2.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 20 | ↗ AURE Skincare | [projects/aure.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/aure.html) | `assets/originals/artrends-23.webp`<br>`assets/projects/project-23-2.webp`<br>`assets/projects/project-23-3.webp`<br>`assets/projects/project-23-4.webp`<br>`assets/projects/project-23-5.webp` | Behind the identity; 4 gallery figures; 1 navigation block |
| 21 | ↗ Bone Appetit Bakery Pet food | [projects/bone-appetit-bakery.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/bone-appetit-bakery.html) | `assets/originals/artrends-24.webp`<br>`assets/projects/project-24-2.webp`<br>`assets/projects/project-24-3.webp`<br>`assets/projects/project-24-4.webp`<br>`assets/projects/project-24-5.webp` | Behind the identity; 4 gallery figures; 1 navigation block |
| 22 | ↗ SOBA Agriculture | [projects/soba.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/soba.html) | `assets/originals/artrends-25.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 23 | ↗ Aristocrat Unlimited Luxury | [projects/aristocrat-unlimited.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/aristocrat-unlimited.html) | `assets/originals/artrends-26.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 24 | ↗ RXIOM Logistics Logistics | [projects/rxiom-logistics.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/rxiom-logistics.html) | `assets/originals/mount-01.webp`<br>`assets/mountdesign/dribbble-rxiom.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 25 | ↗ Nuvia Beauty & skincare | [projects/nuvia.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/nuvia.html) | `assets/originals/mount-02.webp`<br>`assets/mountdesign/dribbble-nuvia.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 26 | ↗ FabbyLady Beauty & cosmetics | [projects/fabbylady.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/fabbylady.html) | `assets/originals/mount-06.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 27 | ↗ Furnicrown Furniture | [projects/furnicrown.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/furnicrown.html) | `assets/mountdesign/furnicrown.gif` | Behind the identity; 0 gallery figures; 1 navigation block |
| 28 | ↗ Cessa Fashion Fashion | [projects/cessa-fashion.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/cessa-fashion.html) | `assets/originals/mount-08.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 29 | ↗ LIFETIMEPIECES Luxury watches | [projects/lifetimepieces.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/lifetimepieces.html) | `assets/originals/mount-09.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 30 | ↗ Atlanta Construction | [projects/atlanta.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/atlanta.html) | `assets/originals/mount-10.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 31 | ↗ Burger Point Food & beverage | [projects/burger-point.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/burger-point.html) | `assets/originals/mount-11.webp`<br>`assets/mountdesign/dribbble-burger-point.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 32 | ↗ Family Nest Family & community | [projects/family-nest.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/family-nest.html) | `assets/originals/mount-12.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 33 | ↗ Twilight Jewellery | [projects/twilight.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/twilight.html) | `assets/originals/mount-13.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 34 | ↗ Deadliest Warriors Gaming | [projects/deadliest-warriors.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/deadliest-warriors.html) | `assets/originals/mount-14.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 35 | ↗ Aquafortress Hospitality | [projects/aquafortress.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/aquafortress.html) | `assets/originals/mount-15.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 36 | ↗ Central Technology Technology | [projects/central-technology.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/central-technology.html) | `assets/originals/mount-16.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 37 | ↗ Apricate Organics Organic products | [projects/apricate-organics.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/apricate-organics.html) | `assets/originals/mount-17.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 38 | ↗ ZYAN Academy Education | [projects/zyan-academy.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/zyan-academy.html) | `assets/originals/mount-18.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 39 | ↗ Squirrel Woolart Craft & textiles | [projects/squirrel-woolart.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/squirrel-woolart.html) | `assets/originals/mount-19.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 40 | ↗ SUPEES Brand identity | [projects/supees.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/supees.html) | `assets/originals/mount-20.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 41 | ↗ Wine Waltz Food & beverage | [projects/wine-waltz.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/wine-waltz.html) | `assets/originals/mount-21.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 42 | ↗ Glute Gym Fitness | [projects/glute-gym.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/glute-gym.html) | `assets/originals/mount-22.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 43 | ↗ Enerlume Renewable energy | [projects/enerlume.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/enerlume.html) | `assets/originals/mount-23.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 44 | ↗ Primal Power Fitness & nutrition | [projects/primal-power.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/primal-power.html) | `assets/originals/mount-24.webp` | Behind the identity; 0 gallery figures; 1 navigation block |
| 45 | ↗ Axiron Industry & technology | [projects/axiron.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/axiron.html) | `assets/originals/mount-25.webp`<br>`assets/mountdesign/dribbble-axiron.webp` | Behind the identity; 1 gallery figures; 1 navigation block |
| 46 | ↗ Logo design / 03 Logo design | [projects/logo-design-03.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-03.html) | `assets/originals/artrends-03.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 47 | ↗ Logo design / 04 Logo design | [projects/logo-design-04.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-04.html) | `assets/originals/artrends-04.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 48 | ↗ Logo design / 05 Logo design | [projects/logo-design-05.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-05.html) | `assets/originals/artrends-05.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 49 | ↗ Logo design / 27 Logo design | [projects/logo-design-27.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-27.html) | `assets/originals/artrends-27.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 50 | ↗ Logo design / 28 Logo design | [projects/logo-design-28.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-28.html) | `assets/originals/artrends-28.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 51 | ↗ Logo design / 29 Logo design | [projects/logo-design-29.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-29.html) | `assets/originals/artrends-29.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 52 | ↗ Logo design / 30 Logo design | [projects/logo-design-30.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-30.html) | `assets/originals/artrends-30.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 53 | ↗ Logo design / 31 Logo design | [projects/logo-design-31.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-31.html) | `assets/originals/artrends-31.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 54 | ↗ Logo design / 32 Logo design | [projects/logo-design-32.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-32.html) | `assets/originals/artrends-32.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 55 | ↗ Logo design / 33 Logo design | [projects/logo-design-33.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-33.html) | `assets/originals/artrends-33.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 56 | ↗ Logo design / 34 Logo design | [projects/logo-design-34.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-34.html) | `assets/originals/artrends-34.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 57 | ↗ Logo design / 35 Logo design | [projects/logo-design-35.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-35.html) | `assets/originals/artrends-35.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 58 | ↗ Logo design / 36 Logo design | [projects/logo-design-36.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-36.html) | `assets/originals/artrends-36.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 59 | ↗ Logo design / 37 Logo design | [projects/logo-design-37.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-37.html) | `assets/originals/artrends-37.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 60 | ↗ Logo design / 38 Logo design | [projects/logo-design-38.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-38.html) | `assets/originals/artrends-38.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 61 | ↗ Logo design / 39 Logo design | [projects/logo-design-39.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-39.html) | `assets/originals/artrends-39.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 62 | ↗ Logo design / 40 Logo design | [projects/logo-design-40.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-design-40.html) | `assets/originals/artrends-40.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 63 | ↗ Logo study 03 Logo design | [projects/logo-study-03.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-03.html) | `assets/originals/mount-03.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 64 | ↗ Logo study 04 Logo design | [projects/logo-study-04.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-04.html) | `assets/originals/mount-04.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 65 | ↗ Logo study 05 Logo design | [projects/logo-study-05.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-05.html) | `assets/originals/mount-05.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 66 | ↗ Logo study 26 Logo design | [projects/logo-study-26.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-26.html) | `assets/originals/mount-26.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 67 | ↗ Logo study 27 Logo design | [projects/logo-study-27.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-27.html) | `assets/originals/mount-27.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 68 | ↗ Logo study 28 Logo design | [projects/logo-study-28.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-28.html) | `assets/originals/mount-28.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 69 | ↗ Logo study 29 Logo design | [projects/logo-study-29.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-29.html) | `assets/originals/mount-29.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 70 | ↗ Logo study 30 Logo design | [projects/logo-study-30.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-30.html) | `assets/originals/mount-30.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 71 | ↗ Logo study 31 Logo design | [projects/logo-study-31.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-31.html) | `assets/originals/mount-31.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 72 | ↗ Logo study 32 Logo design | [projects/logo-study-32.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-32.html) | `assets/originals/mount-32.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 73 | ↗ Logo study 33 Logo design | [projects/logo-study-33.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-33.html) | `assets/originals/mount-33.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 74 | ↗ Logo study 34 Logo design | [projects/logo-study-34.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-34.html) | `assets/originals/mount-34.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 75 | ↗ Logo study 35 Logo design | [projects/logo-study-35.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-35.html) | `assets/originals/mount-35.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 76 | ↗ Logo study 36 Logo design | [projects/logo-study-36.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-36.html) | `assets/originals/mount-36.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 77 | ↗ Logo study 37 Logo design | [projects/logo-study-37.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-37.html) | `assets/originals/mount-37.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 78 | ↗ Logo study 38 Logo design | [projects/logo-study-38.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-38.html) | `assets/originals/mount-38.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 79 | ↗ Logo study 39 Logo design | [projects/logo-study-39.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-39.html) | `assets/originals/mount-39.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 80 | ↗ Logo study 40 Logo design | [projects/logo-study-40.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-40.html) | `assets/originals/mount-40.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 81 | ↗ Logo study 41 Logo design | [projects/logo-study-41.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-41.html) | `assets/originals/mount-41.webp` | Client perspective; 0 gallery figures; 1 navigation block |
| 82 | ↗ Logo study 42 Logo design | [projects/logo-study-42.html](https://sprixo-branding-studio.delight-hjv.chatgpt.site/projects/logo-study-42.html) | `assets/originals/mount-42.webp` | Client perspective; 0 gallery figures; 1 navigation block |

Published filter totals: {"Brand identity":45,"Logo design":37}.

## Image URL access inventory

HEAD requests checked 281 unique same-origin image URLs referenced by src, srcset, favicon/social links and data-carousel attributes. A successful response verifies URL/type only; images were not all visually inspected or downloaded. Data-carousel references are included as potential assets even though no carousel behavior was found.

| Asset path | HTTP / error | Content type |
| --- | --- | --- |
| `assets/listing/mount-01-1440.webp` | 200 | image/webp |
| `assets/listing/mount-01-720.webp` | 200 | image/webp |
| `assets/listing/mount-02-1440.webp` | 200 | image/webp |
| `assets/listing/mount-02-720.webp` | 200 | image/webp |
| `assets/listing/mount-03-1440.webp` | 200 | image/webp |
| `assets/listing/mount-03-720.webp` | 200 | image/webp |
| `assets/listing/mount-04-1440.webp` | 200 | image/webp |
| `assets/listing/mount-04-720.webp` | 200 | image/webp |
| `assets/listing/mount-05-1440.webp` | 200 | image/webp |
| `assets/listing/mount-05-720.webp` | 200 | image/webp |
| `assets/listing/mount-06-1440.webp` | 200 | image/webp |
| `assets/listing/mount-06-720.webp` | 200 | image/webp |
| `assets/listing/mount-08-1440.webp` | 200 | image/webp |
| `assets/listing/mount-08-720.webp` | 200 | image/webp |
| `assets/listing/mount-09-1440.webp` | 200 | image/webp |
| `assets/listing/mount-09-720.webp` | 200 | image/webp |
| `assets/listing/mount-10-1440.webp` | 200 | image/webp |
| `assets/listing/mount-10-720.webp` | 200 | image/webp |
| `assets/listing/mount-11-1440.webp` | 200 | image/webp |
| `assets/listing/mount-11-720.webp` | 200 | image/webp |
| `assets/listing/mount-12-1440.webp` | 200 | image/webp |
| `assets/listing/mount-12-720.webp` | 200 | image/webp |
| `assets/listing/mount-13-1440.webp` | 200 | image/webp |
| `assets/listing/mount-13-720.webp` | 200 | image/webp |
| `assets/listing/mount-14-1440.webp` | 200 | image/webp |
| `assets/listing/mount-14-720.webp` | 200 | image/webp |
| `assets/listing/mount-15-1440.webp` | 200 | image/webp |
| `assets/listing/mount-15-720.webp` | 200 | image/webp |
| `assets/listing/mount-16-1440.webp` | 200 | image/webp |
| `assets/listing/mount-16-720.webp` | 200 | image/webp |
| `assets/listing/mount-17-1440.webp` | 200 | image/webp |
| `assets/listing/mount-17-720.webp` | 200 | image/webp |
| `assets/listing/mount-18-1440.webp` | 200 | image/webp |
| `assets/listing/mount-18-720.webp` | 200 | image/webp |
| `assets/listing/mount-19-1440.webp` | 200 | image/webp |
| `assets/listing/mount-19-720.webp` | 200 | image/webp |
| `assets/listing/mount-20-1440.webp` | 200 | image/webp |
| `assets/listing/mount-20-720.webp` | 200 | image/webp |
| `assets/listing/mount-21-1440.webp` | 200 | image/webp |
| `assets/listing/mount-21-720.webp` | 200 | image/webp |
| `assets/listing/mount-22-1440.webp` | 200 | image/webp |
| `assets/listing/mount-22-720.webp` | 200 | image/webp |
| `assets/listing/mount-23-1440.webp` | 200 | image/webp |
| `assets/listing/mount-23-720.webp` | 200 | image/webp |
| `assets/listing/mount-24-1440.webp` | 200 | image/webp |
| `assets/listing/mount-24-720.webp` | 200 | image/webp |
| `assets/listing/mount-25-1440.webp` | 200 | image/webp |
| `assets/listing/mount-25-720.webp` | 200 | image/webp |
| `assets/listing/mount-26-1440.webp` | 200 | image/webp |
| `assets/listing/mount-26-720.webp` | 200 | image/webp |
| `assets/listing/mount-27-1440.webp` | 200 | image/webp |
| `assets/listing/mount-27-720.webp` | 200 | image/webp |
| `assets/listing/mount-28-1440.webp` | 200 | image/webp |
| `assets/listing/mount-28-720.webp` | 200 | image/webp |
| `assets/listing/mount-29-1440.webp` | 200 | image/webp |
| `assets/listing/mount-29-720.webp` | 200 | image/webp |
| `assets/listing/mount-30-1440.webp` | 200 | image/webp |
| `assets/listing/mount-30-720.webp` | 200 | image/webp |
| `assets/listing/mount-31-1440.webp` | 200 | image/webp |
| `assets/listing/mount-31-720.webp` | 200 | image/webp |
| `assets/listing/mount-32-1440.webp` | 200 | image/webp |
| `assets/listing/mount-32-720.webp` | 200 | image/webp |
| `assets/listing/mount-33-1440.webp` | 200 | image/webp |
| `assets/listing/mount-33-720.webp` | 200 | image/webp |
| `assets/listing/mount-34-1440.webp` | 200 | image/webp |
| `assets/listing/mount-34-720.webp` | 200 | image/webp |
| `assets/listing/mount-35-1440.webp` | 200 | image/webp |
| `assets/listing/mount-35-720.webp` | 200 | image/webp |
| `assets/listing/mount-36-1440.webp` | 200 | image/webp |
| `assets/listing/mount-36-720.webp` | 200 | image/webp |
| `assets/listing/mount-37-1440.webp` | 200 | image/webp |
| `assets/listing/mount-37-720.webp` | 200 | image/webp |
| `assets/listing/mount-38-1440.webp` | 200 | image/webp |
| `assets/listing/mount-38-720.webp` | 200 | image/webp |
| `assets/listing/mount-39-1440.webp` | 200 | image/webp |
| `assets/listing/mount-39-720.webp` | 200 | image/webp |
| `assets/listing/mount-40-1440.webp` | 200 | image/webp |
| `assets/listing/mount-40-720.webp` | 200 | image/webp |
| `assets/listing/mount-41-1440.webp` | 200 | image/webp |
| `assets/listing/mount-41-720.webp` | 200 | image/webp |
| `assets/listing/mount-42-1440.webp` | 200 | image/webp |
| `assets/listing/mount-42-720.webp` | 200 | image/webp |
| `assets/listing/project-01-1440.webp` | 200 | image/webp |
| `assets/listing/project-01-720.webp` | 200 | image/webp |
| `assets/listing/project-02-1440.webp` | 200 | image/webp |
| `assets/listing/project-02-720.webp` | 200 | image/webp |
| `assets/listing/project-03-1440.webp` | 200 | image/webp |
| `assets/listing/project-03-720.webp` | 200 | image/webp |
| `assets/listing/project-04-1440.webp` | 200 | image/webp |
| `assets/listing/project-04-720.webp` | 200 | image/webp |
| `assets/listing/project-05-1440.webp` | 200 | image/webp |
| `assets/listing/project-05-720.webp` | 200 | image/webp |
| `assets/listing/project-06-1440.webp` | 200 | image/webp |
| `assets/listing/project-06-720.webp` | 200 | image/webp |
| `assets/listing/project-07-1440.webp` | 200 | image/webp |
| `assets/listing/project-07-720.webp` | 200 | image/webp |
| `assets/listing/project-08-1440.webp` | 200 | image/webp |
| `assets/listing/project-08-720.webp` | 200 | image/webp |
| `assets/listing/project-09-1440.webp` | 200 | image/webp |
| `assets/listing/project-09-720.webp` | 200 | image/webp |
| `assets/listing/project-10-1440.webp` | 200 | image/webp |
| `assets/listing/project-10-720.webp` | 200 | image/webp |
| `assets/listing/project-11-1440.webp` | 200 | image/webp |
| `assets/listing/project-11-720.webp` | 200 | image/webp |
| `assets/listing/project-12-1440.webp` | 200 | image/webp |
| `assets/listing/project-12-720.webp` | 200 | image/webp |
| `assets/listing/project-13-1440.webp` | 200 | image/webp |
| `assets/listing/project-13-720.webp` | 200 | image/webp |
| `assets/listing/project-14-1440.webp` | 200 | image/webp |
| `assets/listing/project-14-720.webp` | 200 | image/webp |
| `assets/listing/project-15-1440.webp` | 200 | image/webp |
| `assets/listing/project-15-720.webp` | 200 | image/webp |
| `assets/listing/project-16-1440.webp` | 200 | image/webp |
| `assets/listing/project-16-720.webp` | 200 | image/webp |
| `assets/listing/project-17-1440.webp` | 200 | image/webp |
| `assets/listing/project-17-720.webp` | 200 | image/webp |
| `assets/listing/project-18-1440.webp` | 200 | image/webp |
| `assets/listing/project-18-720.webp` | 200 | image/webp |
| `assets/listing/project-19-1440.webp` | 200 | image/webp |
| `assets/listing/project-19-720.webp` | 200 | image/webp |
| `assets/listing/project-20-1440.webp` | 200 | image/webp |
| `assets/listing/project-20-720.webp` | 200 | image/webp |
| `assets/listing/project-21-1440.webp` | 200 | image/webp |
| `assets/listing/project-21-720.webp` | 200 | image/webp |
| `assets/listing/project-22-1440.webp` | 200 | image/webp |
| `assets/listing/project-22-720.webp` | 200 | image/webp |
| `assets/listing/project-23-1440.webp` | 200 | image/webp |
| `assets/listing/project-23-720.webp` | 200 | image/webp |
| `assets/listing/project-24-1440.webp` | 200 | image/webp |
| `assets/listing/project-24-720.webp` | 200 | image/webp |
| `assets/listing/project-25-1440.webp` | 200 | image/webp |
| `assets/listing/project-25-720.webp` | 200 | image/webp |
| `assets/listing/project-26-1440.webp` | 200 | image/webp |
| `assets/listing/project-26-720.webp` | 200 | image/webp |
| `assets/listing/project-27-1440.webp` | 200 | image/webp |
| `assets/listing/project-27-720.webp` | 200 | image/webp |
| `assets/listing/project-28-1440.webp` | 200 | image/webp |
| `assets/listing/project-28-720.webp` | 200 | image/webp |
| `assets/listing/project-29-1440.webp` | 200 | image/webp |
| `assets/listing/project-29-720.webp` | 200 | image/webp |
| `assets/listing/project-30-1440.webp` | 200 | image/webp |
| `assets/listing/project-30-720.webp` | 200 | image/webp |
| `assets/listing/project-31-1440.webp` | 200 | image/webp |
| `assets/listing/project-31-720.webp` | 200 | image/webp |
| `assets/listing/project-32-1440.webp` | 200 | image/webp |
| `assets/listing/project-32-720.webp` | 200 | image/webp |
| `assets/listing/project-33-1440.webp` | 200 | image/webp |
| `assets/listing/project-33-720.webp` | 200 | image/webp |
| `assets/listing/project-34-1440.webp` | 200 | image/webp |
| `assets/listing/project-34-720.webp` | 200 | image/webp |
| `assets/listing/project-35-1440.webp` | 200 | image/webp |
| `assets/listing/project-35-720.webp` | 200 | image/webp |
| `assets/listing/project-36-1440.webp` | 200 | image/webp |
| `assets/listing/project-36-720.webp` | 200 | image/webp |
| `assets/listing/project-37-1440.webp` | 200 | image/webp |
| `assets/listing/project-37-720.webp` | 200 | image/webp |
| `assets/listing/project-38-1440.webp` | 200 | image/webp |
| `assets/listing/project-38-720.webp` | 200 | image/webp |
| `assets/listing/project-39-1440.webp` | 200 | image/webp |
| `assets/listing/project-39-720.webp` | 200 | image/webp |
| `assets/listing/project-40-1440.webp` | 200 | image/webp |
| `assets/listing/project-40-720.webp` | 200 | image/webp |
| `assets/mountdesign/dribbble-axiron.webp` | 200 | image/webp |
| `assets/mountdesign/dribbble-burger-point.webp` | 200 | image/webp |
| `assets/mountdesign/dribbble-nuvia.webp` | 200 | image/webp |
| `assets/mountdesign/dribbble-rxiom.webp` | 200 | image/webp |
| `assets/originals/artrends-01.webp` | 200 | image/webp |
| `assets/originals/artrends-02.webp` | 200 | image/webp |
| `assets/originals/artrends-03.webp` | 200 | image/webp |
| `assets/originals/artrends-04.webp` | 200 | image/webp |
| `assets/originals/artrends-05.webp` | 200 | image/webp |
| `assets/originals/artrends-06.webp` | 200 | image/webp |
| `assets/originals/artrends-07.webp` | 200 | image/webp |
| `assets/originals/artrends-08.webp` | 200 | image/webp |
| `assets/originals/artrends-09.webp` | 200 | image/webp |
| `assets/originals/artrends-10.webp` | 200 | image/webp |
| `assets/originals/artrends-11.webp` | 200 | image/webp |
| `assets/originals/artrends-12.webp` | 200 | image/webp |
| `assets/originals/artrends-13.webp` | 200 | image/webp |
| `assets/originals/artrends-14.webp` | 200 | image/webp |
| `assets/originals/artrends-15.webp` | 200 | image/webp |
| `assets/originals/artrends-16.webp` | 200 | image/webp |
| `assets/originals/artrends-17.webp` | 200 | image/webp |
| `assets/originals/artrends-18.webp` | 200 | image/webp |
| `assets/originals/artrends-19.webp` | 200 | image/webp |
| `assets/originals/artrends-20.webp` | 200 | image/webp |
| `assets/originals/artrends-21.webp` | 200 | image/webp |
| `assets/originals/artrends-22.webp` | 200 | image/webp |
| `assets/originals/artrends-23.webp` | 200 | image/webp |
| `assets/originals/artrends-24.webp` | 200 | image/webp |
| `assets/originals/artrends-25.webp` | 200 | image/webp |
| `assets/originals/artrends-26.webp` | 200 | image/webp |
| `assets/originals/artrends-27.webp` | 200 | image/webp |
| `assets/originals/artrends-28.webp` | 200 | image/webp |
| `assets/originals/artrends-29.webp` | 200 | image/webp |
| `assets/originals/artrends-30.webp` | 200 | image/webp |
| `assets/originals/artrends-31.webp` | 200 | image/webp |
| `assets/originals/artrends-32.webp` | 200 | image/webp |
| `assets/originals/artrends-33.webp` | 200 | image/webp |
| `assets/originals/artrends-34.webp` | 200 | image/webp |
| `assets/originals/artrends-35.webp` | 200 | image/webp |
| `assets/originals/artrends-36.webp` | 200 | image/webp |
| `assets/originals/artrends-37.webp` | 200 | image/webp |
| `assets/originals/artrends-38.webp` | 200 | image/webp |
| `assets/originals/artrends-39.webp` | 200 | image/webp |
| `assets/originals/artrends-40.webp` | 200 | image/webp |
| `assets/originals/mount-01.webp` | 200 | image/webp |
| `assets/originals/mount-02.webp` | 200 | image/webp |
| `assets/originals/mount-03.webp` | 200 | image/webp |
| `assets/originals/mount-04.webp` | 200 | image/webp |
| `assets/originals/mount-05.webp` | 200 | image/webp |
| `assets/originals/mount-06.webp` | 200 | image/webp |
| `assets/originals/mount-08.webp` | 200 | image/webp |
| `assets/originals/mount-09.webp` | 200 | image/webp |
| `assets/originals/mount-10.webp` | 200 | image/webp |
| `assets/originals/mount-11.webp` | 200 | image/webp |
| `assets/originals/mount-12.webp` | 200 | image/webp |
| `assets/originals/mount-13.webp` | 200 | image/webp |
| `assets/originals/mount-14.webp` | 200 | image/webp |
| `assets/originals/mount-15.webp` | 200 | image/webp |
| `assets/originals/mount-16.webp` | 200 | image/webp |
| `assets/originals/mount-17.webp` | 200 | image/webp |
| `assets/originals/mount-18.webp` | 200 | image/webp |
| `assets/originals/mount-19.webp` | 200 | image/webp |
| `assets/originals/mount-20.webp` | 200 | image/webp |
| `assets/originals/mount-21.webp` | 200 | image/webp |
| `assets/originals/mount-22.webp` | 200 | image/webp |
| `assets/originals/mount-23.webp` | 200 | image/webp |
| `assets/originals/mount-24.webp` | 200 | image/webp |
| `assets/originals/mount-25.webp` | 200 | image/webp |
| `assets/originals/mount-26.webp` | 200 | image/webp |
| `assets/originals/mount-27.webp` | 200 | image/webp |
| `assets/originals/mount-28.webp` | 200 | image/webp |
| `assets/originals/mount-29.webp` | 200 | image/webp |
| `assets/originals/mount-30.webp` | 200 | image/webp |
| `assets/originals/mount-31.webp` | 200 | image/webp |
| `assets/originals/mount-32.webp` | 200 | image/webp |
| `assets/originals/mount-33.webp` | 200 | image/webp |
| `assets/originals/mount-34.webp` | 200 | image/webp |
| `assets/originals/mount-35.webp` | 200 | image/webp |
| `assets/originals/mount-36.webp` | 200 | image/webp |
| `assets/originals/mount-37.webp` | 200 | image/webp |
| `assets/originals/mount-38.webp` | 200 | image/webp |
| `assets/originals/mount-39.webp` | 200 | image/webp |
| `assets/originals/mount-40.webp` | 200 | image/webp |
| `assets/originals/mount-41.webp` | 200 | image/webp |
| `assets/originals/mount-42.webp` | 200 | image/webp |
| `assets/projects/cover-01.webp` | 200 | image/webp |
| `assets/projects/cover-02.webp` | 200 | image/webp |
| `assets/projects/cover-06.webp` | 200 | image/webp |
| `assets/projects/cover-08.webp` | 200 | image/webp |
| `assets/projects/cover-17.webp` | 200 | image/webp |
| `assets/projects/cover-24.webp` | 200 | image/webp |
| `assets/projects/project-01-2.webp` | 200 | image/webp |
| `assets/projects/project-02-2.webp` | 200 | image/webp |
| `assets/projects/project-10-2.webp` | 200 | image/webp |
| `assets/projects/project-11-2.webp` | 200 | image/webp |
| `assets/projects/project-12-2.webp` | 200 | image/webp |
| `assets/projects/project-13-2.webp` | 200 | image/webp |
| `assets/projects/project-14-2.webp` | 200 | image/webp |
| `assets/projects/project-15-2.webp` | 200 | image/webp |
| `assets/projects/project-15-3.webp` | 200 | image/webp |
| `assets/projects/project-15-4.webp` | 200 | image/webp |
| `assets/projects/project-15-5.webp` | 200 | image/webp |
| `assets/projects/project-16-2.webp` | 200 | image/webp |
| `assets/projects/project-17-2.webp` | 200 | image/webp |
| `assets/projects/project-19-2.webp` | 200 | image/webp |
| `assets/projects/project-20-2.webp` | 200 | image/webp |
| `assets/projects/project-22-2.webp` | 200 | image/webp |
| `assets/projects/project-23-2.webp` | 200 | image/webp |
| `assets/projects/project-23-3.webp` | 200 | image/webp |
| `assets/projects/project-23-4.webp` | 200 | image/webp |
| `assets/projects/project-23-5.webp` | 200 | image/webp |
| `assets/projects/project-24-2.webp` | 200 | image/webp |
| `assets/projects/project-24-3.webp` | 200 | image/webp |
| `assets/projects/project-24-4.webp` | 200 | image/webp |
| `assets/projects/project-24-5.webp` | 200 | image/webp |
| `assets/sprixo-icon.svg` | 200 | image/svg+xml |
| `assets/sprixo-logo-white.png` | 200 | image/png |
| `assets/sprixo-logo.png` | 200 | image/png |
| `assets/sprixo-website-preview.webp` | 200 | image/webp |

### Final image-check result

All 281 discovered image URLs returned HTTP 200 with image content types. Five initial HEAD checks timed out and succeeded on retry; no image URL remained inaccessible in this inventory. Only Voltexa cover and RXIOM listing samples were visually inspected: the former is a blue technology presentation, the latter a black/white composition with a yellow mark. This is not a rendered website review. Source artwork, font binaries and private backend assets remain unavailable as described above.
