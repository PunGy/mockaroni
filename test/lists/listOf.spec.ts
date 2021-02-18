import { checkNullable } from '../testUtils/checkNullable'
import { listOf } from '@src/lists/listOf'

describe('range', () =>
{
    it('returns list of provided keys', () =>
    {
        const list = ['one', 'two']
        const result = listOf({ size: 10, list })

        expect(
            result.includes(list[0]) && result.includes(list[1]),
        ).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', checkNullable(listOf, { size: 5, list: [1] }))
})
