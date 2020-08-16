import castArray from './castArray'

test('should return empty array', () => {
  expect(castArray()).toEqual([])
})

test('should convert to array', () => {
  expect(castArray(1)).toEqual([1])
})

test('should return array', () => {
  expect(castArray([1])).toEqual([1])
})
