const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@veditor/ui', path.resolve(__dirname, '../ui/'))
  }
}
