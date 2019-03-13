export default {
  key: 'tab',
  hotKey: 'tab',
  handler (selection) {
    document.execCommand('insertText', false, '\t')
  }
}
