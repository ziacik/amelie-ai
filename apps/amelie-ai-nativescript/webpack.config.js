// @ts-check
const webpack = require('@nativescript/webpack');

module.exports = (/** @type {webpack.IWebpackEnv} */ env) => {
	env.appComponents = [...(env.appComponents ?? []), './src/activity.android'];

	webpack.init(env);
	webpack.useConfig('angular');

	webpack.chainWebpack((config) => {
		config.plugin('DefinePlugin').tap((args) => {
			Object.assign(args[0], {
				'globalThis.OPENAI_API_KEY': `'${process.env.OPENAI_API_KEY}'`,
			});

			return args;
		});
	});

	return webpack.resolveConfig();
};
