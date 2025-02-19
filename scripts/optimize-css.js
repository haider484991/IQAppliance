const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    purgecss({
      content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: ['html', 'body'],
        deep: [/^react-/, /^next-/],
        greedy: [/^nav-/, /^modal-/, /^menu-/],
      },
    }),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: false,
      }],
    }),
  ],
};
