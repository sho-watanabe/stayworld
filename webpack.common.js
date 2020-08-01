const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");


module.exports = ({ outputFile, assetFile }) => ({
  entry: { main: "./src/scripts/main.js"},
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css|\.sass|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|svg|woff2?|tff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${assetFile}.[ext]`,
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
            "html-loader"
          ],

      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      utils: [path.resolve(__dirname, 'src/utils'),'default']
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        Vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        utils: {
          name: "utils",
          test: /src[\\/]utils/,
          priority: -10,
        },
        default: false,
      },
    },
  },
});
