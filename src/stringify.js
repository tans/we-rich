import { arrayIncludes } from './compat'

export function formatAttributes (attrs) {
  var attrsArray = []
  for (var k in attrs) {
    attrsArray.push({ key: k, value: attrs[k] })
  }
  return attrsArray.reduce((attrs, attribute) => {
    const { key, value } = attribute
    if (value === null) {
      return `${attrs} ${key}`
    }
    const quoteEscape = value.indexOf("'") !== -1
    const quote = quoteEscape ? '"' : "'"
    return `${attrs} ${key}=${quote}${value}${quote}`
  }, '')
}

export function toHTML (tree, options) {
  return tree
    .map(node => {
      if (node.type === 'text') {
        return node.text
      }
      if (node.type === 'comment') {
        return `<!--${node.text}-->`
      }
      const { name, attrs, children } = node
      const isSelfClosing = arrayIncludes(options.voidTags, name.toLowerCase())
      return isSelfClosing
        ? `<${name}${formatAttributes(attrs)}>`
        : `<${name}${formatAttributes(attrs)}>${toHTML(
            children,
            options
          )}</${name}>`
    })
    .join('')
}

export default { toHTML }
