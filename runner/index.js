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
 * @param {string} code - Code to run
 * @return {object} Parsed ast
 * @throws {string} Human-readable error
 */
function parse(code) {
  try {
    return parser.parse(code)
  } catch (e) {
    throw buildErrorMessage(e)
  }
}

/**
 * @param {string} code - Code to run
 * @return {Array} Lines of generated table
 */
export function run(code) {
  const ast = parse(code)
  return []
}
