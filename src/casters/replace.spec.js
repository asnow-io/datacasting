import replace from './replace'

test('shouuld replace string with string', () => {
  expect(replace('to replace', 'replaced')('some text to replace')).toBe('some text replaced')
})
