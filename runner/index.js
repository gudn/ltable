import parser from './parser.js'

/** Format syntax error message to string from SyntaxError
 * @param {SyntaxError} e - Error from parser
 * @return {string} Human-readable error
 */
function buildErrorMessage(e) {
  return e.location !== undefined
    ? 'Line ' +
        e.location.start.line +
        ', column ' +
        e.location.start.column +
        ': ' +
        e.message
    : e.message
}

/**
 * @typedef {Object} Expr
 * @property {string} operation
 * @property {(Expr|string|boolean)} operand1
 * @property {(Expr|string|boolean|null)} operand2
 */

/**
 * @typedef {Object} Ast
 * @property {Array<string>} vars
 * @property {Object} aliases
 * @property {Object} results
 * @property {Array<Expr>} filters
 */

/**
 * @param {string} code - Code to run
 * @return {Ast} Parsed ast
 * @throws {string} Human-readable error
 */
function parse(code) {
  try {
    return parser.parse(code)
  } catch (e) {
    throw buildErrorMessage(e)
  }
}

/** Return a list 0, 1, ... 2^n in binary representation abc...
 * @param {Array<string>} vars - list of vars name
 * @return {Array<object>} list of all input variants
 * */
export function generateInputs(vars) {
  const n = vars.length
  if (n === 0) return []

  vars = Array.from(vars).reverse()

  function convert(num) {
    const result = {}
    for (const name of vars) {
      result[name] = num % 2 === 1
      num >>= 1
    }
    return result
  }

  return Array(Math.pow(2, n))
    .fill()
    .map((_, i) => convert(i))
}

/** Compute value of expr with given ctx return it value
 * @param {(Expr|string|boolean)} expr
 * @param {object} ctx
 * @return {boolean}
 */
export function computeExpr(expr, ctx) {
  switch (typeof expr) {
    case 'boolean':
      return expr
    case 'string':
      if (expr in ctx) return ctx[expr]
      throw `Not found ${expr} in context`
    case 'object':
      const op1 = computeExpr(expr.operand1, ctx)
      const op2 =
        expr.operand2 !== null ? computeExpr(expr.operand2, ctx) : null
      switch (expr.operation) {
        case 'equality':
          return op1 === op2
        case 'implication':
          return !op1 || op2
        case 'or':
          return op1 || op2
        case 'xor':
          return Boolean(op1 ^ op2)
        case 'and':
          return op1 && op2
        case 'not':
          return !op1
        default:
          throw `Invalid operation ${expr.operation}`
      }
    default:
      throw `Invalid type of expr ${typeof expr}`
  }
}

/**
 * @typedef LRow
 * @property {object} vars - input
 * @property {Array<string>} varsOrder - input name ordering
 * @property {object} aliases
 * @property {object} results
 * @property {number} index
 */

/** Compute result and apply filter for given input
 * @param {Ast} ast
 * @param {object} inputs - Initial context (modify it!)
 * @param {number} index
 * @return {(LRow|null)}
 */
export function computeCode(ast, inputs, index) {
  const aliases = Object.assign({}, inputs)
  for (const [name, value] of Object.entries(ast.aliases)) {
    if (name in aliases) {
      throw `Duplicate ${name} name`
    }
    aliases[name] = computeExpr(value, aliases)
  }
  const results = {}
  for (const [name, value] of Object.entries(ast.results)) {
    if (name in aliases) {
      throw `Duplicate ${name} name`
    }
    results[name] = computeExpr(value, aliases)
  }
  const filterCtx = { ...inputs, ...aliases, ...results }
  let filtersPassed = ast.filters.length === 0
  for (const filter of ast.filters)
    if (computeExpr(filter, filterCtx)) {
      filtersPassed = true
      break
    }

  for (const name of ast.vars) delete aliases[name]

  if (filtersPassed)
    return {
      vars: inputs,
      varsOrder: ast.vars,
      aliases,
      results,
      index,
    }
  else return null
}

/**
 * @param {string} code - Code to run
 * @return {Array<LRow>} Lines of generated table
 */
export function run(code) {
  const ast = parse(code)
  const inputs = generateInputs(ast.vars)
  const results = []
  inputs.forEach((input, i) => {
    const row = computeCode(ast, input, i)
    if (row !== null) results.push(row)
  })
  return results
}
