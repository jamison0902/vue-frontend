const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuração do Webpack
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    // Configuração do watchOptions para o Webpack
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000, // Ativa polling a cada 1 segundo
    },
  },

  // Configuração do DevServer (sem o watchOptions aqui)
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: true,
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
    },
  },
});
