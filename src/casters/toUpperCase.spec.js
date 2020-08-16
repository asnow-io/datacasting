import toUpperCase from './toUpperCase'

test('should transform text to lower case', () => {
  expect(toUpperCase('Capitalized Text')).toBe('CAPITALIZED TEXT')
  expect(toUpperCase('lowercased text')).toBe('LOWERCASED TEXT')
})
