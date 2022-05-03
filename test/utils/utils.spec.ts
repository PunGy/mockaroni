import { assignSoft, capitalize } from '@src/utils'

describe('utils', () =>
{
    describe('assignSoft', () =>
    {
        it('returns combined object without overwriting', () =>
        {
            expect(
                assignSoft({ a: 1, b: 2 }, { b: 3, c: 4 }),
            ).toStrictEqual({ a: 1, b: 2, c: 4 })
        })
    })

    describe('capitalize', () =>
    {
        it('returns capitalized word', () =>
        {
            expect(capitalize('wasd')).toBe('Wasd')
        })
        it('returns empty string on empty', () =>
        {
            expect(capitalize('')).toBe('')
        })
    })
})
