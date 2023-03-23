const { defineConfig } = require('@vue/cli-service')
const path = require('path')


module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "./src/styles/media.scss";
						 `
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src/'),
				'@assets':  path.resolve(__dirname, 'src/assets/'),
				'@components': path.resolve(__dirname, 'src/components/'),
				'@composable': path.resolve(__dirname, 'src/composable/'),
				'@utils':  path.resolve(__dirname, 'src/utils/'),
				'@constants':  path.resolve(__dirname, 'src/utils/constants.ts'),
				'@pages':  path.resolve(__dirname, 'src/pages/'),
				'@services':  path.resolve(__dirname, 'src/services/'),
				'@types':  path.resolve(__dirname, 'src/types.ts'),

			}
		}
	}
})
