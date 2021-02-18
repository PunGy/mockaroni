import { num } from '@src/primitives/num'
import { checkNullable } from '../testUtils/checkNullable'

describe('num', () =>
{
    it('returns number in provided range', () =>
    {
        const result = num({ min: 0, max: 10 })

        expect(result >= 0 && result <= 10).toBeTruthy()
    })

    it('returns float number on type "float"', () =>
    {
        const result = num({ min: 0, max: 10, type: 'float' })

        expect(result >= 0 && result <= 10).toBeTruthy()
    })

    it('returns null if "nullable" provided', checkNullable(num, { min: 0, max: 10 }))
})
