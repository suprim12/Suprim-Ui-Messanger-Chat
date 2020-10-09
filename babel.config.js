module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false,
        targets: { browsers: '> 0.25%, ie 11, not op_mini all, not dead' }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    ['transform-class-properties']
  ],
  ignore: [/@babel[\\|/]runtime/]
}
