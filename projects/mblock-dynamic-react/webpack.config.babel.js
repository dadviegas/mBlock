import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { use, build, configuration } from 'mblock-module'
import { babel, entry, output, enviromnent, resolve, extractCss, file, uglify, commonsChunk, html, devServer } from 'mblock-module/plugins'
import { hotReload } from 'mblock-react/plugins'

const sourcePath = join(__dirname, 'src')
const outputPath = join(__dirname, 'dist')

use(
  babel(),
  hotReload(),
  entry({
    index: [
      './index'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom'
    ]
  }),
  output({
    path: outputPath,
    chunkFilename: '[id].chunk.js',
    filename: '[name].js',
    publicPath: '/'
  }),
  enviromnent(),
  resolve({ mainFields: [ 'web', 'browser', 'module', 'jsnext:main', 'style', 'main' ] }),
  extractCss({ filename: 'style.css' }),
  file(),
  uglify(),
  commonsChunk({names: ['vendor', 'common']}),
  html({
    title: 'React Boilerplate',
    template: join(__dirname, 'src', 'index.ejs'),
  }),
  devServer()
)

configuration({
  context: sourcePath
})

export default (env) => {
  const conf = build({env})
  return conf
}

