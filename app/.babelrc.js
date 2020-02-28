// module.exports = {
//   presets: ['next/babel'],
//   plugins: [['styled-components', { ssr: true, displayName: true }]],
// }
module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    [
      'babel-plugin-styled-components',
      { ssr: true, displayName: true, preprocess: false },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          { ssr: true, displayName: false, preprocess: false },
        ],
      ],
    },
  },
}
