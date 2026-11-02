const { resolve } = require('node:path');
const { mkdirSync, copyFileSync } = require('node:fs');

module.exports = {
  plugins: [require('./projects/build-plugin.cjs')(), {
    name: 'sprixo-private-mailer-package',
    closeBundle() {
      mkdirSync(resolve(__dirname, 'dist-private'), { recursive: true });
      for (const file of ['composer.json', 'config.example.php']) {
        copyFileSync(resolve(__dirname, 'server/sprixo-private', file), resolve(__dirname, 'dist-private', file));
      }
    },
  }],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        services: resolve(__dirname, 'services.html'),
        careers: resolve(__dirname, 'careers.html'),
        quote: resolve(__dirname, 'quote.html'),
        consultation: resolve(__dirname, 'consultation.html'),
        project: resolve(__dirname, 'project.html'),
      },
    },
  },
};
