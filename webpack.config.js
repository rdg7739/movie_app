const path=require('path');

const config ={
    entry: './path/to/my/entry/file.js',
    outpput:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
        },
        module:{
            rules:[
            {test:/\.txt$/, use: 'raw-loader'}
            ]
        }
    };

    module.exports = config;
