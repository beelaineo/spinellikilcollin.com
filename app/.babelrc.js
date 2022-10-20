module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    'react-activation/babel',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
        topLevelImportPaths: ['@xstyled/styled-components'],
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            ssr: true,
            displayName: false,
            preprocess: false,
            topLevelImportPaths: ['@xstyled/styled-components'],
          },
        ],
      ],
    },
  },
}
