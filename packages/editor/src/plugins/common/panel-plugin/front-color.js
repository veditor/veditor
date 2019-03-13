import ColorPanel from './ColorPanel'

export default {
  key: 'front-color',
  icon: 'format_color_text',
  state: {
    active: false
  },
  component: ColorPanel,
  initialValue ({editor, bar}) {
    return editor.$lastSelection.style.color
  },
  handleChange (color, {editor, bar}) {
    if (editor.$lastSelection.select()) {
      document.execCommand('foreColor', false, color)
    }
  }
}
