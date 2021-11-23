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
 * @property {(Expr|string|boolean|null)} operand1
 * @property {(Expr|string|boolean|null)} operand2
 */

/**
 * @typedef {Object} Ast
 * @property {Array<string>} vars
 * @property {Object} aliases
 * @property {Object} results
 * @property {Array<Object>} filters
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

  vars = vars.reverse()

  function convert(num) {
    const result = {}
    for (const name of vars) {
      result[name] = num % 2 === 1
      num >>= 1
    }
    return result
  }

  return Array(Math.pow(2, n)).map((_, i) => convert(i))
}

/**
 * @param {string} code - Code to run
 * @return {Array<object>} Lines of generated table
 */
export function run(code) {
  const ast = parse(code)
  const inputs = generateInputs(ast.vars)
  return []
}
