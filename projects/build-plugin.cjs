const fs = require('node:fs');
const path = require('node:path');
const projects = require('../data/projects.json');
const { sharedLayout, renderProject } = require('./template.cjs');

module.exports = function projectPages() {
  let root;
  const layout = (template) => sharedLayout(template, fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
  return {
    name: 'sprixo-static-project-pages',
    enforce: 'post',
    configResolved(config) { root = config.root; },
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        return path.resolve(context.filename) === path.resolve(root, 'project.html') ? layout(html) : html;
      },
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        const project = projects.find((item) => pathname === `/projects/${item.slug}.html`);
        if (!project) return next();
        try {
          const template = layout(fs.readFileSync(path.join(root, 'project.html'), 'utf8'));
          const html = await server.transformIndexHtml('/project.html', renderProject(template, project, projects));
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(html);
        } catch (error) { next(error); }
      });
    },
    generateBundle(_options, bundle) {
      const template = bundle['project.html'];
      if (!template || template.type !== 'asset') this.error('Missing built project template');
      projects.forEach((project) => {
        this.emitFile({
          type: 'asset',
          fileName: `projects/${project.slug}.html`,
          source: renderProject(layout(String(template.source)), project, projects),
        });
      });
      delete bundle['project.html'];
    },
  };
};
