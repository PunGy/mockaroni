import { num } from '@src/primitives/num'
import * as utils from '@src/utils'

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

    it('returns null if "nullable" provided', () =>
    {
        jest.spyOn(utils, 'trueOrFalse').mockImplementationOnce(() => true)
        const result = num({ min: 0, max: 10, nullable: true })

        expect(result).toBeNull()
    })
})
