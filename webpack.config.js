const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "none",
    entry: "./src/ts/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            inject: "body",
            path: path.resolve(__dirname, "dist")
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/css"),
                    to: path.resolve(__dirname, "dist/css")
                }
            ]
        })
    ]
}