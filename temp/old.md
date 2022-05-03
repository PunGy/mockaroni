# Mockaroni

[![codecov](https://codecov.io/gh/PunGy/mockaroni/branch/main/graph/badge.svg)](https://codecov.io/gh/PunGy/mockaroni)
[![npm](https://img.shields.io/npm/dt/mockaroni.svg)](https://www.npmjs.com/package/mockaroni) [![npm](https://img.shields.io/npm/v/mockaroni.svg)](https://www.npmjs.com/package/mockaroni)
[![npm](https://img.shields.io/bundlephobia/min/mockaroni)](https://bundlephobia.com/result?p=mockaroni) [![node-current](https://img.shields.io/node/v/mockaroni)](https://www.npmjs.com/package/mockaroni)

`mockaroni` is a tool for fast generating mock javascript entities.

# Usage

Input:
```ts
import { replicate, str, num, oneOf, date, listOf, text } from 'mockaroni'

interface Worker
{
    name: string;
    age: number;
    position: 'manager' | 'director' | 'clerk';
    dateOfEmployment: Date;
    achievements: Array<'owl' | 'hard worker' | 'coffee lower' | 'gambler'> | null;
    place: {
        officeId: string;
        floor: number;
    };
    biography: string;
}

// Spawn 100 workers schema
const workers: Array<Worker> = replicate({
    size: 100,
    schema: () => ({
        // Spawn capitalized string of chars with size in range of 4 to 8
        name: text({ size: 1, type: 'names' }),

        // Spawn number from 15 to 90
        age: num({ min: 15, max: 90 }),

        // Select on of the options provided in list
        position: oneOf({ list: ['manager', 'director', 'clerk'] as const }),

        // Spawn date in selected edges
        dateOfEmployment: date({ min: new Date('2018'), max: new Date('2020') }),

        // Spawn list of achievements. Count of achievements can be from 1 to 4, or null
        achievements: listOf({
            list: ['owl', 'hard worker', 'coffee lower', 'gambler'] as const,
            size: num({ min: 1, max: 4 }),
            nullable: true,
        }),

        place: {
            // Spawn 10 length alphanumeric string
            officeId: str({ type: 'alphanumeric', size: 10 }),
            // Spawn number from 1 to 20
            floor: num({ min: 1, max: 20 }),
        },

        // Generate text with 10-30 words
        biography: text({ size: num({ min: 10, max: 30 }) }),
    }),
})

console.log(workers)
```

output:
```js
[
    {
        name: 'Annie',
        age: 74,
        position: 'manager',
        dateOfEmployment: 2019-10-24T11:20:41.367Z,
        achievements: [ 'hard worker', 'hard worker', 'hard worker' ],
        place: { officeId: 'eg2wqrm3q5', floor: 17 },
        biography: 'muddle abandoned clear stupid obtainable earn arm lumber nostalgic race toothsome reflective offer identify tow woozy butter parcel smile dapper tow shivering'
    },
    {
        name: 'Lachlan',
        age: 74,
        position: 'clerk',
        dateOfEmployment: 2018-07-01T14:04:21.348Z,
        achievements: null,
        place: { officeId: '92b687038k', floor: 7 },
        biography: 'raise frightened word learned shame hellish sleep sheep direful cable absurd'
    },
    {
        name: 'Hamzah',
        age: 49,
        position: 'director',
        dateOfEmployment: 2019-01-24T22:33:43.132Z,
        achievements: null,
        place: { officeId: 'jfscywmz4n', floor: 19 },
        biography: 'parcel magic craven identify frightened mint toothsome zippy protect huge shivering sea clever rat actually filthy kittens'
    },
    ...
]
```

# Functions

Every function accepts a config object with detail information about how to generate desired value. You also can replace default randomizer by using `Mockaroni.setConfig({ random: randomFn })`

Also, every config has parameter `{ nullable: boolean }`. If it's provided and is `true` - return value might be a `null`

## Primitives

Contains functions which is produces primitive values

### trueOrFalse

Generates random `true` or `false` value. No parameters

`config`: no such

`Example`
```js
trueOrFalse()
// true
```

### Date

Generates a random date

`Config:`
```ts
type DateConfig = { 
    min: Date; // start point of date
    max: Date; // end point of date
}
```
`Example`
```js
date({ min: new Date('2018'), max: new Date('2020') })
// 2019-02-01T10:02:19.628Z
```

### Num

Generates a random number

`Config:`
```ts
export type NumConfig = { 
    min: number; // low border of numbers
    max: number; // high border of numbers
    type?: 'float'|'int'; // would a result number be an integer or float
}
```

`Example:`
```js
num({ min: 10, max: 20 })
// 12
```

### OneOf

Providing a value from the list

`Config:`
```ts
type OneOfConfig<T> = {
    list: ArrayLike<T>; // list of values
}
```

```js
oneOf({ list: ['first', 'second', 'third'] })
// 'second'

oneOf({ list: 'abcd' })
// 'c'
```

### Str

Generates a random string

`Config:`
```ts
export type StringConfig = {
    /**
     * Which characters would be in a string
     * Default: 'alpha'
     */
    type?: 'alpha'|'numeric'|'alphanumeric';

    /**
     * Alphabet of a string
     * Default: 'latin'
     */
    locale?: 'cyrillic'|'latin';

    /**
     * Case of string
     * Default: 'lowercase'
     */
    format?: 'capitalized'|'lowercase'|'uppercase'|'mixed';

    /**
     * The size of resulting string
     * Required
     */
    size: number;
}
```

`Example`
```js
str({ type: 'alphanumeric', size: 10 })
// 'a0s2eew123'
```

### Text

Generates a random text separated by spaces

`Config:`
```ts
type PartialWordsSet = {
    words?: Array<string>;
    names?: {
        male?: Array<string>;
        female?: Array<string>;
        mixed?: Array<string>;
    };
}

type TextConfig = {
    /**
     * The content of resulting text, would it be a random strings, names or plain words
     * Default: 'words'
     */
    type?: 'words'|'random_string'|'names';

    /**
     * Genders of names if the type is 'names'
     * Default: 'mixed'
     */
    namesGender?: 'male'|'female'|'mixed';

    /**
     * Config of random string if the type is 'random_string'
     * Default: { size: 7 }
     */
    randomStringConfig?: StringConfig;

    /**
     * Custom list of words and names
     * Default: {}
     */
    wordsSet?: PartialWordsSet;

    /**
     * Should the text be capitalized (first letter is in upper case)
     * Default: false
     */
    capitalized?: boolean;

    /**
     * Count of words in resulting text
     */
    size: number;
}
```

`Example:`
```js
text({ wordsCount: 20 })
```
