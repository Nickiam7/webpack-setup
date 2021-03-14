const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPluign = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name]-[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
    },
    plugins: [
        new MiniCssExtractPluign({ filename: "style-[contentHash].css" }), 
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPluign.loader, "css-loader", "sass-loader"]
            }
        ]
    }
});