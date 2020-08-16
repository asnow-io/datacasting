import { parse } from 'date-fns'

/**
 * @param {string} format 
 * @returns {Date}
 */
export default function toDate(format) {
  return function (value) {
    return parse(value, format, new Date())
  }
}
