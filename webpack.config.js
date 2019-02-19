var webpack = require("webpack");
var path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
	mode: 'development',
	optimization: {
		usedExports: true
	},
	entry: {
		app: [
			'./src/scripts/app.js',
			'./src/styles/app.scss'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		    {
		        test: /\.scss$/,
		        use: [
		          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
		          "css-loader",
		          "sass-loader"
		        ]
		    },
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	        inject: true,
      		hash: false,
      		template: './index.html',
      		filename: 'index.html'
	    }),
	    new webpack.HotModuleReplacementPlugin(),
	    new MiniCssExtractPlugin({
	      	filename: "[name].css"
	    }),
	],
};

if(!inProduction) {
	
}