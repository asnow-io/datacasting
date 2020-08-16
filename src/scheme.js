export default function scheme(scheme) {
  return {
    rewrite,
    cast,
  }

  function rewrite(data) {
    if (Array.isArray(data)) {
      return data.map(o => prepareObject(o, true))
    }

    return prepareObject(data, true)
  }

  function cast(data) {
    if (Array.isArray(data)) {
      return data.map(o => prepareObject(o, false))
    }

    return prepareObject(data, false)
  }

  /**
   * 
   * @param {object} data 
   * @param {boolean} pure 
   */
  function prepareObject(data, pure = true) {
    const result = pure ? {} : { ...data }

    for (const key in scheme) {
      const caster = scheme[key]

      if (typeof caster === 'function') {
        result[key] = caster(data[key], key, data)
      } else {
        result[key] = scheme[key]
      }
    }

    return result
  }
}
