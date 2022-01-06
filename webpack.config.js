// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: {
    main: "./src/index.js",
    isinvp: "./src/isinvp.js",
    move: './src/move.js',
    slide: './src/slide.js',
    menu: './src/menu.js',
  // video : './src/video.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "local.iforex.com",
    https: true,
    port: 443
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "isInViewPort.html",
      filename: "isinvp.html",
      chunks: ['isinvp']
    }),
    new HtmlWebpackPlugin({
      template: "move.html",
      filename: "move.html",
      chunks: ['move']
    }),
    new HtmlWebpackPlugin({
      template: "slide.html",
      filename: "slide.html",
      chunks: ['slide']
    }),

    new HtmlWebpackPlugin({
      template: 'menu.html',
      filename: 'menu.html',
      chunks: ['menu']
    }),
    new HtmlWebpackPlugin({
      template: 'video.html',
      filename: 'video.html',
      chunks: []
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
