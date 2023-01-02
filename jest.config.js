module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!chart.js)'],
  setupFiles: ['jest-canvas-mock'],
}
