import { trueOrFalse } from '@src/utils'

describe('utils', () =>
{
    it('trueOrFalse returns boolean', () =>
    {
        expect(typeof trueOrFalse()).toBe('boolean')
    })
})
