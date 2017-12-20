export function splitHead (str, sep) {
  const idx = str.indexOf(sep)
  if (idx === -1) return [str]
  return [str.slice(0, idx), str.slice(idx + sep.length)]
}

export function unquote (str) {
  const car = str.charAt(0)
  const end = str.length - 1
  const isQuoteStart = car === '"' || car === "'"
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end)
  }
  return str
}

export function format (nodes) {
  return nodes
    .map(node => {
      const type = node.type
      if (type === 'element') {
        const tagName = node.tagName.toLowerCase()
        const attributes = formatAttributes(node.attributes)
        const children = format(node.children)
        return { type: 'node', name: tagName, attrs: attributes, children }
      }

      if (type === 'text') {
        return { type: 'text', text: node.content }
      }
      return null
    })
    .filter(i => i)
  // 小程序只支持 node 和 text节点. comment要过滤掉
}

export function formatAttributes (attributes) {
  return attributes.map(attribute => {
    const parts = splitHead(attribute.trim(), '=')
    const key = parts[0]
    const value = typeof parts[1] === 'string' ? unquote(parts[1]) : null
    return { key, value }
  })
}
