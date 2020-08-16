import toInteger from './toInteger'

test('should convert from string to integer', () => {
  expect(toInteger('5')).toBe(5)
  expect(toInteger('10.34')).toBe(10)
  expect(toInteger('10.34.333')).toBe(10)
  expect(toInteger(' 20.4')).toBe(20)
  expect(toInteger('')).toBe(0)
})

test('should convert from float to integer', () => {
  expect(toInteger(5.5)).toBe(5)
})
