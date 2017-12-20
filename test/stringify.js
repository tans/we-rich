import test from 'ava'
import { parse, stringify } from '../lib'

test('stringify() should handle simple conversions', t => {
  const str1 = '<h1>Text</h1>'
  t.is(stringify(parse(str1)), str1)

  const str2 = 'Text'
  t.is(stringify(parse(str2)), str2)

  const str3 = '<!--Comment-->'
  t.is(stringify(parse(str3)), '')
})

test('stringify() should work for void elements', t => {
  const meta = "<meta charset='utf8'>"
  t.is(stringify(parse(meta)), '<div></div>')

  const link = "<link rel='stylesheet' href='file.css'>"
  t.is(stringify(parse(link)), '<div></div>')
})

test('stringify() should build the class attribute properly', t => {
  const elem = "<div class='foo bar baz'></div>"
  t.is(stringify(parse(elem)), elem)
})

test('stringify() should build data-* attributes properly', t => {
  const elem = "<div data-one='5' data-two='five'></div>"
  t.is(stringify(parse(elem)), '<div></div>')
})

test('stringify() should build the style attribute properly', t => {
  const elem = "<div style='color: #fff; font-size: 12px'></div>"
  t.is(stringify(parse(elem)), elem)
})

test('stringify() should do basic escaping if a value contains either single or double quotes', t => {
  const html = "<div data-val=\"cake is 'good'\"></div>"
  t.is(stringify(parse(html)), '<div></div>')
})

test('stringify() should preserve whitespace', t => {
  const html = [
    '<html>    ',
    '    <h1>    Document    </h1>',
    '</html>   '
  ].join('\n')
  const result = [
    '<div>    ',
    '    <h1>    Document    </h1>',
    '</div>   '
  ].join('\n')
  t.is(stringify(parse(html)), result)
})
