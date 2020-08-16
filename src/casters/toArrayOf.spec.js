import toArrayOf from './toArrayOf'

test('should transform to array of numbers', () => {
  const toArrayOfNumbers = toArrayOf(Number)
  const array = ['1', 2, false, NaN, 'test', {}]

  expect(toArrayOfNumbers(array)).toEqual([1, 2, 0])
})

test('should transform to array of strings', () => {
  const toArrayOfStrings = toArrayOf(String)
  const array = ['1', 2, false, NaN, {}, [1, {}]]

  expect(toArrayOfStrings(array)).toEqual(['1', '2', 'false', 'NaN', '[object Object]', '1,[object Object]'])
})

test('should returns empty array', () => {
  expect(toArrayOf()()).toEqual([])
  expect(toArrayOf(Number)()).toEqual([])
})
