# 🗄️ Datacasting

![coverage statements](./coverage/badge-statements.svg)
![coverage lines](./coverage/badge-lines.svg)
![coverage functions](./coverage/badge-functions.svg)
![coverage branches](./coverage/badge-branches.svg)

Make schemas and cast data declaratively

## Installing

```bash
npm install --save datacasting
# or
yarn add datacasting
```

## Basic usage

### Working with an array of objects

```js
import { scheme, toDate } from 'datacasting'

const userScheme = scheme({
  verified: Boolean,
  created_at: toDate('yyyy-MM-dd'),
})

const casted = userScheme.cast([
  {
    first_name: 'Jonh',
    last_name: 'Doe',
    verified: 0,
    created_at: '2020-01-23',
  }
])

console.log(casted)
// [
//   {
//     "first_name": "Jonh",
//     "last_name": "Doe",
//     "verified": false,
//     "created_at": Date(2020, 0, 23)
//   }
// ]

const rewrited = userScheme.rewrite([
  {
    first_name: 'Jonh',
    last_name: 'Doe',
    verified: 0,
    created_at: '2020-01-23',
  }
])

console.log(rewrited)
// [
//   {
//     "verified": false,
//     "created_at": Date(2020, 0, 23)
//   }
// ]
```

### Working with a single object

```js
import { scheme, toDate } from 'datacasting'

const userScheme = scheme({
  verified: Boolean,
  created_at: toDate('yyyy-MM-dd'),
})

const casted = userScheme.cast({
  first_name: 'Jonh',
  last_name: 'Doe',
  verified: 0,
  created_at: '2020-01-23',
})

console.log(casted)
// {
//  "first_name": "Jonh",
//  "last_name": "Doe",
//  "verified": false,
//  "created_at": Date(2020, 0, 23)
// }

const rewrited = userScheme.rewrite({
  first_name: 'Jonh',
  last_name: 'Doe',
  verified: 0,
  created_at: '2020-01-23',
})

console.log(rewrited)
// {
//  "verified": false,
//  "created_at": Date(2020, 0, 23)
// }
```

## API

### Scheme methods

- `cast` – converts data according to the schema, inheriting the passed fields, even if they were not declared in the schema.
- `rewrite` - converts data according to the schema without inheriting the original fields. The result will be an object only from the fields declared in the schema.

### Available caster functions

- First, you can use the built-in type conversion: `String`, `Number` and `Boolean`
  
  ```js
  import { scheme } from 'datacasting'

  const dataScheme = scheme({
    user_id: String,
    verified: Boolean,
    role: Number,
  })
  ```

- `replace(searchValue: string | RegExp, replaceValue: string | RegExp): (value: string) => string`
  
  ```js
  import { scheme, replace } from 'datacasting'

  const dataScheme = scheme({
    name: replace('admin', 'nobody'),
  })

  const casted = dataScheme.cast({
    name: "John Doe - admin",
  })

  console.log(casted)
  // {
  //   "name": "John Doe - nobody"
  // }
  ```

- `toArrayOf<K = StringConstructor | NumberConstructor | BooleanConstructor>(constructor: K): (value: any) => K[]`

  ```js
  import { scheme, toArrayOf } from 'datacasting'

  const dataScheme = scheme({
    skill: toArrayOf(String),
  })

  console.log(dataScheme.cast({
    skill: "javascript",
  }))
  // {
  //   "skill": ["javascript"]
  // }

  console.log(dataScheme.cast({
    skill: ["javascript", "vue", "react"],
  }))
  // {
  //   "skill": ["javascript", "vue", "react"]
  // }
  ```

- `toDate(fromFormat: string): (value: string) => Date`

  Argument `fromFormat` refers to `date-fns` tokens. See: [date-fns parse tokens](https://date-fns.org/v2.15.0/docs/parse).

  ```js
  import { scheme, toDate } from 'datacasting'

  const dataScheme = scheme({
    created_at: toDate('yyyy-MM-dd'),
  })

  console.log(dataScheme.cast({
    created_at: "2020-01-15",
  }))
  // {
  //   "created_at": Date(2020, 0, 15)
  // }
  ```

- `toInteger(value: any): number`

  ```js
  import { scheme, toInteger } from 'datacasting'

  const dataScheme = scheme({
    balance: toInteger,
  })

  console.log(dataScheme.cast({
    balance: '150.33',
  }))
  // {
  //   "balance": 150
  // }
  ```

- `toLowerCase(value: any): string`

  ```js
  import { scheme, toLowerCase } from 'datacasting'

  const dataScheme = scheme({
    name: toLowerCase,
  })

  console.log(dataScheme.cast({
    name: 'John Doe',
  }))
  // {
  //   "name": "john doe"
  // }
  ```

- `toUpperCase(value: any): string`

  ```js
  import { scheme, toUpperCase } from 'datacasting'

  const dataScheme = scheme({
    name: toUpperCase,
  })

  console.log(dataScheme.cast({
    name: 'John Doe',
  }))
  // {
  //   "name": "JOHN DOE"
  // }
  ```

### Write your own caster function

Arguments:

- `{any} value`
- `{string} key`
- `{Object} data`

Returns:

- `{any} result`

```js
import { scheme } from 'datacasting'

const dataScheme = scheme({
  role_id: (value, key, data) => {
    return data.role.id
  })
})

const casted = dataScheme.cast({
  name: 'Jonh Doe',
  role: {
    id: 1,
    name: 'user',
  }
})

console.log(casted)
// {
//  "name": "John Doe",
//  "role_id": 1,
//  "role": {
//    "id": 1,
//    "name": "user"
//  },
// }
```

## License

MIT © Daniel Slepov
