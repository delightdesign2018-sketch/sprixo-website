const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function sharedLayout(template, home) {
  const absoluteLinks = (html) => html.replace(/(href|src)="(?!\/|https?:|#)([^"]+)"/g, '$1="/$2"');
  const header = home.match(/<header\b[\s\S]*?<\/header>/)[0]
    .replace('/assets/sprixo-logo.png', '/assets/sprixo-logo-white.png');
  const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)[0];
  return template.replace('{{PROJECT_HEADER}}', absoluteLinks(header))
    .replace('{{PROJECT_FOOTER}}', absoluteLinks(footer));
}

function renderProject(template, project, projects) {
  const index = projects.indexOf(project);
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  // Some original logo-study descriptions are generic; identify the project
  // while retaining the supplied description verbatim.
  const description = project.seoDescription.toLowerCase().includes(project.name.toLowerCase())
    ? project.seoDescription : `${project.name} — ${project.seoDescription}`;
  const main = `<main id="main">
    <div class="case-scroll-scene">
      <section class="case-hero" aria-labelledby="project-heading">
        <div class="case-hero-cover"><img src="${escape(project.cover.src)}" alt="${escape(project.cover.alt)}" fetchpriority="high"></div>
        <div class="case-hero-caption">
          <a class="back-work" href="/work.html">← All projects</a>
          <p class="eyebrow case-kicker">${escape(project.category)} / ${escape(project.industry)}</p>
          <h1 id="project-heading">${escape(project.name)}</h1>
          <p class="case-subtitle">${escape(project.subtitle)}</p>
          <div class="case-meta">${project.creditsHtml}</div>
        </div>
      </section>
    </div>
    <section class="case-section case-overview" aria-label="Project overview">
      <div>${project.sourceHtml}</div>
      <div class="case-copy">${project.overviewHtml}</div>
    </section>
    ${project.galleryHtml ? `<section class="case-section case-gallery" aria-label="Project artwork">${project.galleryHtml}</section>` : ''}
    <nav class="case-section case-navigation" aria-label="Project navigation">
      <a href="/projects/${escape(previous.slug)}.html" rel="prev"><span>← Previous project</span><strong>${escape(previous.name)}</strong></a>
      <a href="/projects/${escape(next.slug)}.html" rel="next"><span>Next project →</span><strong>${escape(next.name)}</strong></a>
    </nav>
  </main>`;
  return template.replace('{{PROJECT_TITLE}}', escape(project.seoTitle))
    .replace('{{PROJECT_DESCRIPTION}}', escape(description))
    .replace('{{PROJECT_MAIN}}', main);
}

module.exports = { sharedLayout, renderProject };
