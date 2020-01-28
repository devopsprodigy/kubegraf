const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(process.env);
module.exports = {
    target: "node",
    mode: "development",
    entry: {
        "module": "./module.ts",
        "datasource/module": "./datasource/module.ts",
        "css/core": "./sass/core.sass",
        "css/dark": "./sass/dark.sass",
        "css/light": "./sass/light.sass",
    },
    context: path.join(__dirname, "src"),
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {presets: ["env"]}
                    },
                    "ts-loader"
                ],
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
        ]
    },
    externals: [
        function (context, request, callback) {
            const prefix = "grafana/";
            if (request.indexOf(prefix) === 0) {
                return callback(null, request.substr(prefix.length));
            }
            callback();
        }
    ],
    plugins: [
        //new CleanWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([
            "**/*.html",
            "**/*.json",
            //"query_help.md",
            "../LICENSE",
            "../README.md",
            "../CHANGELOG.md",
            {
                from: "img",
                to: "img"
            },
            {
                from: "datasource/img",
                to: "datasource/img"
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "amd"
    },
};
