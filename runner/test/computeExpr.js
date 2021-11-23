import tap from 'tap'

import { computeExpr, generateInputs } from '../index.js'

const and = (operand1, operand2) => ({
  operation: 'and',
  operand1,
  operand2,
})

const or = (operand1, operand2) => ({
  operation: 'or',
  operand1,
  operand2,
})

const xor = (operand1, operand2) => ({
  operation: 'xor',
  operand1,
  operand2,
})

const not = operand1 => ({
  operation: 'not',
  operand1,
  operand2: null,
})

const impl = (operand1, operand2) => ({
  operation: 'implication',
  operand1,
  operand2,
})

const eq = (operand1, operand2) => ({
  operation: 'equality',
  operand1,
  operand2,
})

tap.equal(computeExpr('a', { a: true }), true)
tap.equal(computeExpr(and(true, true), {}), true)
tap.equal(computeExpr(and('b', true), { b: false }), false)
tap.equal(computeExpr(or(false, true), {}), true)
tap.equal(computeExpr(or(false, false), {}), false)
tap.equal(computeExpr(xor(false, false), {}), false)
tap.equal(computeExpr(xor(false, true), {}), true)
tap.equal(computeExpr(xor(true, true), {}), false)
tap.equal(computeExpr(not(false), {}), true)
tap.equal(computeExpr(not(true), {}), false)

generateInputs(['a', 'b']).forEach(ctx =>
  tap.equal(
    computeExpr(impl('a', 'b'), ctx),
    computeExpr(or(not('a'), 'b'), ctx),
  ),
)

generateInputs(['a', 'b']).forEach(ctx =>
  tap.equal(
    computeExpr(eq('a', 'b'), ctx),
    computeExpr(or(and('a', 'b'), and(not('a'), not('b'))), ctx),
  ),
)

generateInputs(['a', 'b']).forEach(ctx =>
  tap.equal(
    computeExpr(xor('a', 'b'), ctx),
    computeExpr(and(or('a', 'b'), not(and('a', 'b'))), ctx),
  ),
)
