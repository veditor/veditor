import ColorPanel from './ColorPanel'

export default {
  key: 'background-color',
  icon: 'format_color_fill',
  state: {
    active: false
  },
  component: ColorPanel,
  initialValue ({editor, bar}) {
    return editor.$lastSelection.style.backgroundColor
  },
  handleChange (color, {editor, bar}) {
    if (editor.$lastSelection.select()) {
      document.execCommand('hiliteColor', false, color)
    }
  }
}
