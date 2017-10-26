const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin =  require('html-webpack-plugin')

module.exports = {
	entry:__dirname + '/src/index.js',
	output:{
		path:__dirname + '/build',
		filename:'bundle.js'
	},
	devServer:{
		contentBase:'./build',
		historyApiFallback:true,
		inline:true,
		hot:true
	},
	module:{
		rules:[
			{
				test:/(\.jsx|\.js)$/,
				use:'babel-loader',
				exclude:/node_modules/
			},
			{
				test:/(\.css)$/,
				use:[{loader:'style-loader'},
				{loader:'css-loader'},
				{loader:'postcss-loader'}]
			},
			{
				test:/(\.less)$/,
				use:[{loader:'style-loader'},
				{loader:'css-loader'},
				{loader:'postcss-loader'},
				{loader:'less-loaader'}]
			},
			{
				test:/\.(svg|ttf|eot|woff|woff2)$/,
				use:'file-loader'
			}]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname + '/src/index.html',
			title:'React Video'
		}),
		new webpack.BannerPlugin('林小芬的演示demo，盗版必究'),
		new webpack.HotModuleReplacementPlugin()
	]
}