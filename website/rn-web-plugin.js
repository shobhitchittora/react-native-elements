const path = require('path');

module.exports = function () {
  return {
    name: 'docusaurus-plugin-react-native-web',
    configureWebpack(_config, isServer, utils) {
      const appDirectory = path.resolve(__dirname, './');
      console.log(appDirectory);

      const { getBabelLoader } = utils;
      const babelOptions = {
        cacheDirectory: true,
        presets: [
          'module:metro-react-native-babel-preset',
        ],
        plugins: [
          'react-native-web',
        ]
      };

      console.log(getBabelLoader(isServer, babelOptions));

      return {
        module: {
          rules: [
            {
              test: /\.js$/,
              include: [
                path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
                path.resolve(appDirectory, 'node_modules/react-native-elements'),
                path.resolve(appDirectory, 'node_modules/react-native-ratings'),
                
              ],
              use: getBabelLoader(isServer, babelOptions)
            }
          ]
        },
        resolve: {
          alias: {
            'react-native$': 'react-native-web'
          },
          extensions: ['.js']
        }
      }
    }
  }
}