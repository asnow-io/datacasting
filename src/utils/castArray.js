/**
 * @returns {Array}
 */
export default function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return Array.isArray(value) ? value : [value];
}
