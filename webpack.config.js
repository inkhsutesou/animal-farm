const path = require( `path` );

module.exports = {

  mode : `development`,
  entry: `./src/entry.js`,

  output: {
    filename: `bundle.js`,
    path: path.resolve( __dirname, `dist` )
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500,
  },

  devServer: {
    contentBase: path.join(__dirname, `dist` ),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [ `style-loader`, `css-loader`, `sass-loader` ]
      }
    ]
  }

};
// {
//         test: /\.scss$/,
//         use: [
//           { loader: `style-loader` }, // creates style nodes from JS strings
//           { loader: `css-loader` }, // translates CSS into CommonJS
//           {
//             loader: `sass-loader`, // compiles Sass to CSS
//             options: {
//                 file: `./src/css/style.scss`,
//                 name: `[name].css`,
//                 includePaths: [ `./src/css/` ],
//                 outputPath: `./dist`
//             }
//           }
//         ]
//     }
// sass.render({
//   file: `/path/to/myFile.scss`,
//   data: `body{background:blue; a{color:black;}}`,
//   importer: function(url, prev, done) {
//     // url is the path in import as is, which LibSass encountered.
//     // prev is the previously resolved path.
//     // done is an optional callback, either consume it or return value synchronously.
//     // this.options contains this options hash, this.callback contains the node-style callback
//     someAsyncFunction(url, prev, function(result){
//       done({
//         file: result.path, // only one of them is required, see section Special Behaviours.
//         contents: result.data
//       });
//     });
//     // OR
//     var result = someSyncFunction(url, prev);
//     return {file: result.path, contents: result.data};
//   },
//   includePaths: [ `lib/`, `mod/` ],
//   outputStyle: `compressed`
// }