/* eslint-disable */
export default {
	displayName: 'readability-service',
	preset: '../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': '@swc/jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/apps/readability-service',
};
