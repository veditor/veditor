/**
 *
 * @param {string} tagName
 * @return {function(Element): boolean}
 */
export function isElement (tagName) {
  tagName = tagName.toUpperCase()
  if (isElement.map[tagName]) {
    return isElement.map[tagName]
  }
  const prediction = element => {
    return element.tagName === tagName
  }
  isElement.map[tagName] = prediction
  return prediction
}

isElement.map = {}
