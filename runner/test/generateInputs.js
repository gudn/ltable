import tap from 'tap'

import { generateInputs } from '../index.js'

tap.same(generateInputs(['a']), [{ a: 0 }, { a: 1 }])
tap.same(generateInputs(['one', 'two']), [
  { one: 0, two: 0 },
  { one: 0, two: 1 },
  { one: 1, two: 0 },
  { one: 1, two: 1 },
])
tap.same(generateInputs([]), [])
