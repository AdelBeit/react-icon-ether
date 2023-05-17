const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: true,
        // plugins: [
        //   autoprefixer(),
        //   cssnano({
        //     preset: 'default',
        //   }),
        //   tailwindcss({
        //     purge: ['./src/**/*.tsx'],
        //     darkMode: false,
        //     theme: {
        //       extend: {},
        //     },
        //     variants: {
        //       extend: {},
        //     },
        //     plugins: [],
        //   }),
        // ],
        // inject: true,

        // extract: !!options.writeMeta,
      })
    );
    return config;
  },
};
