/**
 * @param {*} data 
 * @returns {number}
 */
export default function toInteger(data) {
  return Number(
    String(data).replace(/(\..*)$/g, '').replace(/[^-\d]/, '')
  )
}
