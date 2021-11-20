const webpack = require('webpack');

const conf = {
    entry: ["@babel/polyfill", __dirname + '/src/start.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    performance: {
        hints: false
    },
    mode: require.main == module ? 'production' : 'development',
    optimization: require.main == module ? {
        minimize: true
    } : {},
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react', { targets: "defaults"}],
                            [ '@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ] 
    }
};

if (require.main == module) {
    webpack(conf, function(err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require('webpack-dev-middleware')(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: '/'
    });
}
