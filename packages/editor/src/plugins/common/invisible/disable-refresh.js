export default [
  {
    key: 'disable-refresh-mac',
    hotKey: 'command+r',
    handler () {
      return false
    }
  }, {
    key: 'disable-refresh-win',
    hotKey: 'f5',
    handler () {
      return false
    }
  }
]
