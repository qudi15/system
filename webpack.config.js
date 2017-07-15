const path = require("path");

module.exports = {
  entry: "./src/platform/broswer.ts",
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
  },
  output: {
    filename: "broswer.runtime.js",
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "./dist/platform"),
  },
  resolve: {
    extensions: [".ts"],
  },
};
