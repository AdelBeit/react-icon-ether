const postcss = require('rollup-plugin-postcss');

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: true,
      })
    );
    return config;
  },
};
