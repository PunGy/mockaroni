import { range } from '@src/lists/range'
import { checkNullable } from '../testUtils/checkNullable'

describe('range', () =>
{
    it('returns array with provided range', () =>
    {
        const result = range({ from: 0, to: 5 })

        expect(result).toEqual([0, 1, 2, 3, 4])
    })

    it('returns possible null if "nullable" provided', checkNullable(range, { from: 0, to: 5 }))
})
