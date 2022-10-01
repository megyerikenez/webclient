module.exports = {
  test: /\.svg$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['preact', 'env'],
      },
    },
    {
      loader: '@svgr/webpack',
      options: { babel: true },
    }
  ],
}