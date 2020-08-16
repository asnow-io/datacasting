import toLowerCase from './toLowerCase'

test('should transform text to lower case', () => {
  expect(toLowerCase('Capitalized Text')).toBe('capitalized text')
  expect(toLowerCase('UPPERCASED TEXT')).toBe('uppercased text')
})
