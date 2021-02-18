import { checkNullable } from '../testUtils/checkNullable'
import { date } from '@src/primitives/date'

const range = {
    min: new Date('2020-01-01'),
    max: new Date('2020-02-01'),
}

describe('date', () =>
{
    it('returns date in provided range', () =>
    {
        const result = date(range).getTime()
        expect(result >= range.min.getTime() && result <= range.max.getTime()).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', checkNullable(date, range))
})
