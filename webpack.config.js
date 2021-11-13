const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const hot = process.argv.filter((argv) => argv === "serve").length > 0;

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

let plugins = [new MiniCssExtractPlugin()];

if (hot) {
  plugins = [...plugins, new ReactRefreshWebpackPlugin()];
}

module.exports = {
  mode,

  module: {
    rules: [
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

  devtool: mode === "development" ? "source-map" : false,
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot,
    compress: true,
    port: 3000,
  },
};
