module.exports = {

	/* Regarding the react tdd book, I will go with webpack
	defaults for entry and output . 
	
	The below defined entry and output are for the code from
	webpack for beginners book (so that all of the book code is
	enclosed within one dir)*/

	// entry: ['./side-learning/webpack/input.js', './src/index.js', './side-learning/egghead-redux/counterReducer.js'],
	entry: './side-learning/egghead-redux/counterReducer.js',
	
	// output: {
	// 	path: __dirname + '/side-learning/webpack/dist',
	// },
  // The presence of resolve here won't work . It should be
  // placed in the module obj -- as done below
	resolve: {
		extensions: ['.js'],
		fullySpecified: false,
	},
	mode: 'development',
	watch: true,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: ['.js'],
					fullySpecified: false,
				},
				use: {
					loader: 'babel-loader',
				// 	options: {
				// 		targets: 'defaults',
				// 		presets: [['@babel/preset-env']],
				// 	},
				},
			},
		],
	},
}
