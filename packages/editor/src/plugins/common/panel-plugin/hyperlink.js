import HyperLinkPanel from './HyperLinkPanel'

export default {
  key: 'hyperlink',
  icon: 'insert_link',
  state: {
    active: false,
    peek: false
  },
  focus: true,
  component: HyperLinkPanel,
  initialValue ({editor, bar}) {
    return {
      insertion: editor.$lastSelection.type === 'Caret',
      selection: editor.$lastSelection
    }
  },
  handleChange ({title, href}, {editor, bar}) {
    if (editor.$lastSelection.select()) {
      switch (editor.$lastSelection.type) {
        case 'Range':
          document.execCommand('createLink', false, href)
          bar.dismissPop()
          break
        case 'Caret':
          const a = document.createElement('a')
          a.href = href
          a.innerText = title
          editor.$lastSelection.rawRange.insertNode(a)
          document.getSelection().selectAllChildren(a)
          document.getSelection().collapseToEnd()
          bar.dismissPop()
          break
      }
    }
  }
}
