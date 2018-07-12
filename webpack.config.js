var path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  node: {
    fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js"
  }
};
