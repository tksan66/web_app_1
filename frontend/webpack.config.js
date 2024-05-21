const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx', //buildするファイル
    output: {
        filename: 'bundle.js', //build後のファイル名
        path: path.join(__dirname, '../django_react/react_app/static/js') //buildファイルが作成される場所
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },        
		//Typescriptの場合のloader設定
			{
				test: /\.ts[x]?$/,  
				exclude: /node_modules/,
				use: 'ts-loader',
			},

		//TailwindCSSファイルを読み込むための設定
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [
									require('tailwindcss'),
									require('autoprefixer'),
								],
							},
						},
					},
				],
			},
		],	
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.json']
	}
};