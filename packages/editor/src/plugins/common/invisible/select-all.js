export default {
  key: 'select-all',
  hotKey: 'mod+a',
  handler () {
    document.getSelection().selectAllChildren(this.editor.$el)
    this.editor.handleSelectionMoved()
    return false
  }
}
