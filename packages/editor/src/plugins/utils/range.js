const buffer = document.createElement('div')

/**
 *
 * @param {Range} range
 * @param {string} elementTag
 * @param {boolean | null} active
 */
export function toggleElement (range, elementTag, active = null) {
  /**
   * @type {DocumentFragment}
   */
  const fragment = range.extractContents()
  range = document.getSelection().getRangeAt(0)
  if (active === true) {
    // TODO: 当完全匹配父节点，extract内容
    // TODO: 当为单个父节点的部分，extract内容并split父节点
    // TODO：当跨过多个节点，则对每个节点执行以上步骤
  } else if (active === false) {
    // 当为光标时，设置peek状态
    if (range.startContainer === range.endContainer && range.startOffset ===
      range.endOffset) {
      return { peek: true }
    }
    // 删除所有子元素的对应tag
    const el = document.createElement(elementTag)
    el.appendChild(fragment)
    for (const node of el.childNodes) {
      _removeWrappingElement(node, elementTag)
    }
    range.insertNode(el)
  }
  return { peek: false }
}

function _removeWrappingElement (node, elementTag) {
  for (const child of node.childNodes) {
    _removeWrappingElement(child, elementTag)
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.tagName.toLowerCase() === elementTag.toLowerCase()) {
      const range = document.createRange()
      range.selectNodeContents(node)
      const content = range.extractContents()
      node.parentNode.replaceChild(content, node)
    }
  }
}

/**
 * Judge if the contents of a range is all children of a certain type of element.
 *
 * @param {Range} range
 * @param {function(Element): boolean} prediction
 */
export function isWrappedByElement (range, prediction) {
  if (isNodeWrappedByElement(range.commonAncestorContainer, prediction)) {
    return true
  }
  let node = range.startContainer
  while (node !== range.endContainer) {
    if (!isNodeWrappedByElement(node, prediction)) {
      return false
    }
    node = node.nextSibling
  }
  return isNodeWrappedByElement(node, prediction)

}

/**
 * Judge if a node is a type of element or child of a element.
 *
 * @param {Node} node
 * @param {function(Element): boolean} prediction
 */
function isNodeWrappedByElement (node, prediction) {
  let parentNode = node
  while (parentNode !== null) {
    if (parentNode.nodeType === Node.ELEMENT_NODE) {
      // noinspection JSCheckFunctionSignatures
      if (prediction(parentNode)) {
        return true
      }
    }
    parentNode = parentNode.parentNode
  }
  return false
}

/**
 *
 * @param {Range} range
 * @param {function(Element): boolean} prediction
 */
export function findFirstParentElement (range, prediction) {
  let node = range.commonAncestorContainer
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE && prediction(node)) {
      return node
    }
    node = node.parentNode
  }
}
