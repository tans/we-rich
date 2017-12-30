# We Rich

> Parse HTML into Weapp rich-text Nodes

> HTML转小程序 rich-text 控件节点

[![npm](https://img.shields.io/npm/v/himalaya.svg)](https://www.npmjs.com/package/we-rich)

## Usage

### Node
```bash安装依赖
npm install we-rich

const weRich = require('we-rich');
var nodes = weRich.parse(html);

```
## 例子 Input/Output

```html
<div class='post post-featured'>
  <p>hello</p>
  <section>world</section>
  <img src="test.png" style="max-width:100%" />
</div>
```

```js
[
  {
    "type": "node",
    "name": "div",
    "attrs": {"class": "post post-featured"},
    "children": [
      {
        "type": "node",
        "name": "p",
        "attrs": {},
        "children": [{"type": "text", "text": "hello"} ]
      },
      {
        "type": "node",
        "name": "div",
        "attrs": {},
        "children": [{"type": "text", "text": "world"}
        ]
      },
      {
        "type": "node",
        "name": "img",
        "attrs": {"src": "test.png", "style": "max-width:100%"},
        "children": []
      }
    ]
  }
]
```


### 功能
HTML into 微信小程序rich-text使用的nodes

### 安装
```
npm install we-rich --save
```
```js
const weRich = require('we-rich');
var nodes = weRich.parse(html);
```

## 此项目基于 [himalaya](https://github.com/andrejewski/himalaya)