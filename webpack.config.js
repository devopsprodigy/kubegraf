const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports.getWebpackConfig = (config, options) => {
    return ({
        ...config,
        module: {
            rules: [
                ...config.module.rules,
                {
                    test: /(dark|light)\.(scss|sass)$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                },
            ]
        }

    });
}
