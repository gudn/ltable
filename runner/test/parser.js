import tap from 'tap'

import parser from '../parser.js'

tap.same(parser.parse(`vars: a b
res f: a and b
`), {
  vars: ['a', 'b'],
  aliases: {},
  results: {
    f: {
      operation: 'and',
      operand1: 'a',
      operand2: 'b'
    }
  },
  filters: [],
})

tap.throws(() => parser.parse('blabla'))
