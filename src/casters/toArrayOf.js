import castArray from '../utils/castArray'

/**
 * @param {StringConstructor|NumberConstructor|BooleanConstructor} constructor 
 */
export default function toArrayOf(constructor) {
  if (typeof constructor !== 'function') {
    return () => []
  }

  return function(data) {
    if (!data) {
      return []
    }

    let array = castArray(data).map(constructor)

    if (constructor === Number) {
      array = array.filter(v => !isNaN(v))
    }

    return array
  }
}
