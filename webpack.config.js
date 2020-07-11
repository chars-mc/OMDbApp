const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/script.js',
   output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.hbs'
      }),
      new MiniCssExtractPlugin({
         filename: 'style.css'
      })
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         },
         {
            test: /\.hbs$/,
            use: 'handlebars-loader'
         },
         {
            test: /\.html$/,
            use: ['html-loader']
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'static',
                     useRelativePath: true
                  }
               }
            ]
         }
      ]
   }
}