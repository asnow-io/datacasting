import toDate from './toDate'

test('should parse date from string token', () => {
  const toDateYYYMMDD = toDate('yyyy-MM-dd')

  expect(toDateYYYMMDD('2020-01-12')).toEqual(new Date(2020, 0, 12))
})
