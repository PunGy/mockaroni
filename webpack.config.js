const path = require('path')
const isModule = process.env.NODE_ENV === 'module'

const config = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'web-bundle'),
        filename: isModule ? 'index.mjs' : 'index.js',
        globalObject: 'this',
        library: isModule ? {
            type: 'module',
        } : {
            name: 'Mockaroni',
            type: 'global',
        },
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: isModule ? 'tsconfig.module.json' : 'tsconfig.build.json',
                },
                exclude: /node_modules/,
            },
        ],
    },
    experiments: {
        outputModule: isModule,
    },
}

module.exports = config