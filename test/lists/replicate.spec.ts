import { replicate } from '@src/lists/replicate'
import { checkNullable } from '../testUtils/checkNullable'

describe('replicate', () =>
{
    it('returns list of provided schema and size', () =>
    {
        const result = replicate({ size: 5, schema: (i) => i })

        expect(result).toEqual([0, 1, 2, 3, 4])
    })

    it('returns list of unique values', () =>
    {
        const result = replicate({ size: 5, schema: () => ({}) })

        expect(
            result.every((value, i) => value !== result[i + 1]),
        ).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', checkNullable(replicate, { size: 1, schema: () => 1 }))
})
