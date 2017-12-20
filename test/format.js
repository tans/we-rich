import test from 'ava'
import { parse, parseDefaults } from '../'

/*
These tests ensure the parser and v1 formatting align.

These tests mainly serve as a gauntlet for generic use.
Do not add any more of these kinds of tests, instead
test the more granular bits.
*/

test('parse() should pass the Hello World case', t => {
  const html = '<html><h1>Hello, World</h1></html>'
  const data = [
    {
      type: 'node',
      name: 'div',
      attrs: {},
      children: [
        {
          type: 'node',
          name: 'h1',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'Hello, World'
            }
          ]
        }
      ]
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for mixed attrs', t => {
  const html =
    "<div class='section widget'><b disabled>Poop</b><p>Pee</p></div>"
  const data = [
    {
      type: 'node',
      name: 'div',
      attrs: {
        class: 'section widget'
      },
      children: [
        {
          type: 'node',
          name: 'b',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'Poop'
            }
          ]
        },
        {
          type: 'node',
          name: 'p',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'Pee'
            }
          ]
        }
      ]
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for commented html', t => {
  const html = '<b><!--comment text-->words</b>'
  const data = [
    {
      type: 'node',
      name: 'b',
      attrs: {},
      children: [
        // {
        //   type: 'comment',
        //   text: 'comment text'
        // },
        {
          type: 'text',
          text: 'words'
        }
      ]
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for style properties', t => {
  const html =
    "<div style='width: 360px; height: 120px; background-color: #fff'></div>"
  const data = [
    {
      type: 'node',
      name: 'div',
      attrs: {
        style: 'width: 360px; height: 120px; background-color: #fff'
      },
      children: []
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work on data-* attrs', t => {
  const html = "<div data-num=0 data-word='poop' data-cake='2'></div>"
  const data = [
    {
      type: 'node',
      name: 'div',
      attrs: {},
      children: []
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('should work on unclosed tags', t => {
  const html = '<p>One two<p>three four'
  const data = [
    {
      type: 'node',
      name: 'p',
      attrs: {},
      children: [
        {
          type: 'text',
          text: 'One two'
        }
      ]
    },
    {
      type: 'node',
      name: 'p',
      attrs: {},
      children: [
        {
          type: 'text',
          text: 'three four'
        }
      ]
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('should not set custom attrs to zeroes', t => {
  const html = "<div custom-attr=''></div>"
  const data = [
    {
      type: 'node',
      name: 'div',
      attrs: {},
      children: []
    }
  ]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('custom tags should appear in the ast', t => {
  {
    const html = '<result>Hello</result>'
    const data = [
      {
        type: 'node',
        name: 'div',
        attrs: {},
        children: [
          {
            type: 'text',
            text: 'Hello'
          }
        ]
      }
    ]
    t.deepEqual(data, parse(html, parseDefaults))
  }

  {
    const html = `<div><h1>Hi there</h1><result></result></div>`
    const data = [
      {
        type: 'node',
        name: 'div',
        attrs: {},
        children: [
          {
            type: 'node',
            name: 'h1',
            attrs: {},
            children: [
              {
                type: 'text',
                text: 'Hi there'
              }
            ]
          },
          {
            type: 'node',
            name: 'div',
            attrs: {},
            children: []
          }
        ]
      }
    ]
    t.deepEqual(data, parse(html, parseDefaults))
  }
})
