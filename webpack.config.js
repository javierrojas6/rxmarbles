"use strict";

const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: ["./src/example"],
  mode: isProduction?'production':'development',
  output: {
    publicPath: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "rxmarbleDiagram",
    // clean: true,
  },
  devtool: isProduction ? "source-map" : "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  resolve: {
    extensions: ["", ".js"],
  },
};
