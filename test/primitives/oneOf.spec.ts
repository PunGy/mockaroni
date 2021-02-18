import { oneOf } from '@src/primitives/oneOf'
import * as utils from '@src/utils'

const list = ['one', 'tow', 'three']

describe('oneOf', () =>
{
    it('returns one of element from provided list', () =>
    {
        expect(list.includes(oneOf({ list }))).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', () =>
    {
        jest.spyOn(utils, 'trueOrFalse').mockImplementationOnce(() => true)
        const nullResult = oneOf({ list, nullable: true })
        jest.spyOn(utils, 'trueOrFalse').mockImplementationOnce(() => false)
        const nonNullResult = oneOf({ list, nullable: true })

        expect(nullResult).toBeNull()
        expect(nonNullResult).not.toBeNull()
    })
})
