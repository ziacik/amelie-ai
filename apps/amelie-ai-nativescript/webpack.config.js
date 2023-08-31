const webpack = require('@nativescript/webpack');

module.exports = (env) => {
	env.appComponents = [...(env.appComponents ?? []), './src/activity.android'];

	webpack.init(env);
	webpack.useConfig('angular');

	return webpack.resolveConfig();
};
