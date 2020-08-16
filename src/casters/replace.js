/**
 * @param {string|RegExp} searchValue 
 * @param {string|RegExp} replaceValue 
 * @returns {Function}
 */
export default function replace(searchValue, replaceValue) {
  return function(data) {
    return String(data).replace(searchValue, replaceValue)
  }
}
