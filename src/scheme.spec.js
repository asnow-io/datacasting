import scheme from './scheme'
import toDate from './casters/toDate'

const dataScheme = scheme({
  verified: Boolean,
  role: Number,
  created_at: toDate('yyyy-MM-dd'),
})

test('should rewrite single object', () => {
  const rewrited = dataScheme.rewrite({
    verified: 0,
    role: '1',
    created_at: '2020-01-15',
  })

  expect(rewrited).toEqual({
    verified: false,
    role: 1,
    created_at: new Date(2020, 0, 15),
  })
})

test('should rewrite array of object', () => {
  const rewrited = dataScheme.rewrite([
    {
      verified: 0,
      role: '1',
      created_at: '2020-01-15',
    },
    {
      verified: 1,
      role: '2',
      created_at: '2020-01-16',
    }
  ])

  expect(rewrited).toEqual([
    {
      verified: false,
      role: 1,
      created_at: new Date(2020, 0, 15),
    },
    {
      verified: true,
      role: 2,
      created_at: new Date(2020, 0, 16),
    }
  ])
})

test('should cast single object', () => {
  const casted = dataScheme.cast({
    first_name: 'John',
    last_name: 'Doe',
    verified: 0,
    role: '1',
    created_at: '2020-01-15',
  })

  expect(casted).toEqual({
    first_name: 'John',
    last_name: 'Doe',
    verified: false,
    role: 1,
    created_at: new Date(2020, 0, 15),
  })
})

test('should cast array of object', () => {
  const casted = dataScheme.cast([
    {
      first_name: 'John',
      last_name: 'Doe',
      verified: 0,
      role: '1',
      created_at: '2020-01-15',
    },
    {
      first_name: 'Freddie',
      last_name: 'Mercury',
      verified: 1,
      role: '2',
      created_at: '2020-01-16',
    }
  ])

  expect(casted).toEqual([
    {
      first_name: 'John',
      last_name: 'Doe',
      verified: false,
      role: 1,
      created_at: new Date(2020, 0, 15),
    },
    {
      first_name: 'Freddie',
      last_name: 'Mercury',
      verified: true,
      role: 2,
      created_at: new Date(2020, 0, 16),
    }
  ])
})

test('should be assigned a non-function value', () => {
  const dataScheme = scheme({
    verified: Boolean,
    role: 'some non-function value',
  })

  const rewrited = dataScheme.rewrite({
    verified: 0,
    role: '1',
  })

  expect(rewrited).toEqual({
    verified: false,
    role: 'some non-function value',
  })
})
