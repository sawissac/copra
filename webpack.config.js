const path = require("path");

module.exports = [
  {
    name: "bundle:watch",
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "editor/"),
      filename: "bundle.js",
    },
    watch: true,
    mode: "development"
  },
  {
    name: "bundle:build",
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "editor/"),
      filename: "bundle.js",
    },
    mode: "production"
  },
  {
    name: "bundleLogin:watch",
    entry: "./app.js",
    output: {
      path: path.resolve(__dirname),
      filename: "app.bundle.js",
    },
    watch: true,
    mode: "development"
  },
  {
    name: "bundleLogin:build",
    entry: "./app.js",
    output: {
      path: path.resolve(__dirname),
      filename: "app.bundle.js",
    },
    mode: "production"
  },
];
