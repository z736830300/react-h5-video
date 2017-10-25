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
		contentBase:'./public',
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
				test:/(\.less|\.css)$/,
				use:[{loader:'style-loader'},
				{loader:'css-loader',options:{importLoaders:2}},
				{loader:'postcss-loader'},
				{loader:'less-loader'}]	
			}
		]
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