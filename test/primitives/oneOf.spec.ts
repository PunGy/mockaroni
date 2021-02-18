import { oneOf } from '@src/primitives/oneOf'
import { checkNullable } from '../testUtils/checkNullable'

const list = ['one', 'tow', 'three']

describe('oneOf', () =>
{
    it('returns one of element from provided list', () =>
    {
        expect(list.includes(oneOf({ list }))).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', checkNullable(oneOf, { list }))
})
