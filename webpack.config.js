module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        path: "/Volumes/Transcend/WebstormProjects/gameDesign/app/temp/scripts",
        filename: "App.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}