import { css, StyleSheet } from 'aphrodite'

const selection = document.getSelection()

export class CurrentSelection {

  type
  caret
  range
  /**
   *
   * @type {Range}
   */
  rawRange

  constructor () {
    this.rawRange = selection.getRangeAt(0)
    switch (selection.type) {
      case 'Caret': {
        this.type = 'Caret'
        this.caret = {
          node: selection.baseNode,
          offset: selection.baseOffset
        }
        break
      }
      case 'Range': {
        this.type = 'Range'
        this.range = {
          start: {
            node: selection.anchorNode,
            offset: selection.anchorOffset
          },
          end: {
            node: selection.extentNode,
            offset: selection.extentOffset
          }
        }
      }
    }
  }

  select () {
    try {
      switch (this.type) {
        case 'Caret': {
          selection.setPosition(this.caret.node, this.caret.offset)
        }
          break
        case 'Range': {
          const { start, end } = this.range
          selection.setBaseAndExtent(start.node, start.offset, end.node,
            end.offset)
          break
        }
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * @return {CSSStyleDeclaration}
   */
  get style () {
    if (!this._style) {
      switch (this.type) {
        case 'Caret':
          this._style = getComputedStyle(getNearestElement(this.caret.node))
          break
        case 'Range':
          this._style = getComputedStyle(
            getNearestElement(this.range.start.node))
          break
      }
    }
    return this._style
  }

  get element () {
    return getNearestElement(this.rawRange.endContainer)
  }

}

function getNearestElement (node) {
  while (node.nodeType !== Node.ELEMENT_NODE) {
    node = node.parentNode
  }
  return node
}

export function getCurrentSelection () {
  return new CurrentSelection()
}

/**
 *
 * @param {Selection} selection
 * @param {String} text
 */
export function insertOrReplaceText (selection, text) {
  let positioningNode
  let positioningOffset
  switch (selection.type) {
    case 'Caret': {
      const node = selection.baseNode
      const offset = selection.baseOffset
      const textContent = node.textContent
      node.textContent = textContent.slice(0, offset) + text +
        textContent.slice(offset)
      positioningNode = node
      positioningOffset = offset + text.length
      break
    }
    case 'Range': {
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i)
        range.deleteContents()
      }
      let node = selection.baseNode
      while (node.nodeType === Node.ELEMENT_NODE) {
        node = node.childNodes.item(0)
      }
      node.textContent += text
      positioningNode = node
      positioningOffset = node.textContent.length
      break
    }
  }
  if (positioningNode.nodeType === Node.ELEMENT_NODE) {
    selection.setPosition(positioningNode.childNodes.item(0), positioningOffset)
  } else {
    selection.setPosition(positioningNode, positioningOffset)
  }
}

/**
 *
 * @param {Selection} selection
 * @param {Object} styles
 */
export function insertOrReplaceStyle (selection, styles) {
  const cssString = StyleSheet.create({ default: styles })
  switch (selection.type) {
    case 'Caret':
      const node = selection.baseNode
      const offset = selection.baseOffset
      const span = document.createElement('span')
      span.className = css(cssString.default)
      const fragment = document.createDocumentFragment()
      fragment.append(node.textContent.slice(0, offset), span,
        node.textContent.slice(offset))
      node.parentNode.replaceChild(fragment, node)
      span.append('')
      selection.setPosition(span.nextSibling, 0)
  }
}

/**
 *
 * @param {Selection} selection
 * @param {Object} styles
 */
export function isChildren (selection, styles) {
}
