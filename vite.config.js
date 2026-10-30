const { resolve } = require('node:path');

module.exports = {
  plugins: [require('./projects/build-plugin.cjs')()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        services: resolve(__dirname, 'services.html'),
        project: resolve(__dirname, 'project.html'),
      },
    },
  },
};
