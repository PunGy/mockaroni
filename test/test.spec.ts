import { num } from '@src/index'

describe('num', () =>
{
    it('returns number in provided range', () =>
    {
        const result = num({ min: 0, max: 10 })
        expect(result >= 0 && result <= 10).toBeTruthy()
    })
})
