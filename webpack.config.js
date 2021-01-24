const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
  },
  devServer: {
    host: "127.0.0.1",
    // port: 3000, //port that we're using for local host (localhost:8080)
    // compress: true,
    port: 3000,
    // historyApiFallback: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
      },
    },
    // disableHostCheck: true,
    contentBase: path.join(__dirname, "dist"), //tells webpack to serve from the public folder
    publicPath: "/",
    hot: true,
  },
  // devServer: {
  //   historyApiFallBack: true,
  //   // progress: true,
  //   hot: true,
  //   // inline: true,
  //   // https: true,
  //   port: 3000,
  //   contentBase: path.resolve(__dirname, "dist"),
  //   proxy: {
  //     "/download": {
  //       target: "http://localhost:5000/",
  //       secure: false,
  //       changeOrigin: true,
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/models",
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, "src"),
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
};
