const path = require("path");

module.exports = {
    entry: {
        index: "./Scripts/es6/currency-script.js"
    },
    output: {
        path: path.resolve(__dirname, "./Scripts/build"),
        filename: "currency-script.js"
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}