# We Rich

> Parse HTML into Weapp rich-text Nodes
> HTML转小程序 rich-text 控件节点

[![npm](https://img.shields.io/npm/v/himalaya.svg)](https://www.npmjs.com/package/we-rich)

## Usage

### Node
```bash安装依赖
npm install we-rich
```

```js
import fs from 'fs'
import {parse} from 'we-rich'
const html = fs.readFileSync('/webpage.html', {encoding: 'utf8'})
const json = parse(html)
console.log('👉', json)
```

### Weapp
下载 [we-rich.js](https://github.com/tans/we-rich/blob/master/docs/dist/himalaya.js)



## Example Input/Output

```html
<div class='post post-featured'>
  <p>Himalaya parsed me...</p>
  <!-- ...and I liked it. -->
</div>
```

```js
[{
  type: 'element',
  tagName: 'div',
  attributes: [{
    key: 'class',
    value: 'post post-featured'
  }],
  children: [{
    type: 'element',
    tagName: 'p',
    attributes: [],
    children: [{
      type: 'text',
      content: 'Himalaya parsed me...'
    }]
  }, {
    type: 'comment',
    content: ' ...and I liked it. '
  }]
}]
```

*Note:* In this example, text nodes consisting of whitespace are not shown for readability.

## Features

### Synchronous
Himalaya transforms HTML into JSON, that's it. Himalaya is synchronous and does not require any complicated callbacks.

### Handles Weirdness
Himalaya handles a lot of HTML's fringe cases, like:
- Closes unclosed tags `<p><b>...</p>`
- Ignores extra closing tags `<span>...</b></span>`
- Properly handles void tags like `<meta>` and `<img>`
- Properly handles self-closing tags like `<input/>`
- Handles `<!doctype>` and `<-- comments -->`
- Does not parse the contents of `<script>`, `<style>`, and HTML5 `<template>` tags

### Preserves Whitespace
Himalaya does not cut corners and returns an accurate representation of the HTML supplied. To remove whitespace, post-process the JSON; check out [an example script](https://gist.github.com/andrejewski/773487d4f4a46b16865405d7b74eabf9).

## Going back to HTML
Himalaya provides a `stringify` method. The following example parses the HTML to JSON then parses the JSON back into HTML.

```js
import fs from 'fs'
import {parse, stringify} from 'himalaya'

const html = fs.readFileSync('/webpage.html', {encoding: 'utf8'})
const json = parse(html)
fs.writeFileSync('/webpage.html', stringify(json))
```

## 此项目基于 [himalaya](https://github.com/andrejewski/himalaya)