module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@models': './src/models',
        '@configs': './src/configs',
        '@errors': './src/errors',
        '@libs': './src/libs',
        '@middlewares': './src/middlewares',
        '@services': './src/services'
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    [ "@babel/plugin-proposal-decorators", {"legacy": true }],
    [ "@babel/plugin-proposal-class-properties", {"loose": true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
