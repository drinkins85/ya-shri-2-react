module.exports = {
    entry : './src/App.jsx',
    output : {
        filename : 'boundle.js'
       /* path : __dirname + "./public" */
    },
    devServer : {
        inline: true,
        contentBase: "./public",
        port: 3000,
        hot: true
    },
    module : {
        loaders : [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader','babel-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    devtool : 'eval-source-map',

    resolve: {
        extensions: ["*",".js", ".jsx"]
    }


};