const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports.getWebpackConfig = (config, options) => {
    return ({
        ...config,
        entry: {
            ...config.entry,
            "styles/core": "./sass/core.sass",
            "styles/dark": "./sass/dark.sass",
            "styles/light": "./sass/light.sass",
        },
        module: {
            rules: [
                ...config.module.rules,
                {
                    test: /(dark|core|light)\.(scss|sass)$/,
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
