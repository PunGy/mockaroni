import { trueOrFalse } from '@src/primitives/boolean'

describe('boolean', () =>
{
    it('trueOrFalse returns boolean', () =>
    {
        expect(typeof trueOrFalse()).toBe('boolean')
    })
})