const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const hot = process.argv.filter((argv) => argv === "serve").length > 0;

const distDir = path.resolve(__dirname, "dist");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

let plugins = [
  new MiniCssExtractPlugin({
    filename: ({ chunk }) =>
      `${chunk.name.replace("/js/", "/css/")}.[contenthash:8].css`,
  }),
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
];

if (hot) {
  plugins = [...plugins, new ReactRefreshWebpackPlugin()];
}

module.exports = {
  mode,
  entry: path.join(__dirname, "src/index.js"),
  target,

  output: {
    filename: "[name].[contenthash:8].js",
    path: distDir,
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // reach max size until 30kb
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              mode === "development" &&
                hot &&
                require.resolve("react-refresh/babel"),
            ].filter(Boolean),
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins,

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devtool: mode === "development" ? "inline-source-map" : "source-map",
  devServer: {
    static: {
      directory: distDir,
    },
    hot,
    compress: true,
    port: 3000,
  },
};
