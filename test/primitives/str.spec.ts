import { str } from '@src/primitives/str'
import * as utils from '@src/utils'

const alphanumericNormalEnRegex = /^[a-z0-9]+$/ // default
const alphanumericNormalRuRegex = /^[а-я0-9]+$/
const alphanumericCapitalizedEnRegex = /^[A-Z0-9]+$/
const alphanumericCapitalizedRuRegex = /^[А-Я0-9]+$/

const numericRegex = /^[0-9]+$/
const alphaEnRegex = /^[a-z]+$/
const alphaRuRegex = /^[а-я]+$/

const alphaCapitalizedEnRegex = /^[A-Z]+$/
const alphaCapitalizedRuRegex = /^[А-Я]+$/

describe('str', () =>
{
    it('returns string of provided size and default presets', () =>
    {
        const size = 10
        const result = str({ size })

        expect(result.length).toBe(size)
        expect(alphanumericNormalEnRegex.test(result)).toBeTruthy()
    })

    it('returns string in provided range', () =>
    {
        const size = { min: 0, max: 5 }
        const { length } = str({ size })

        expect(length >= size.min && length <= size.max).toBeTruthy()
    })

    it('returns numeric string', () =>
    {
        const result = str({ size: 5, type: 'numeric' })

        expect(numericRegex.test(result)).toBeTruthy()
    })

    it('returns en alpha string', () =>
    {
        const result = str({ size: 5, locale: 'en', type: 'alpha' })

        expect(alphaEnRegex.test(result)).toBeTruthy()
    })
    it('returns ru alpha string', () =>
    {
        const result = str({ size: 5, type: 'alpha', locale: 'ru' })

        expect(alphaRuRegex.test(result)).toBeTruthy()
    })

    it('returns ru alphanumeric string', () =>
    {
        const result = str({ size: 10, locale: 'ru' })

        expect(alphanumericNormalRuRegex.test(result)).toBeTruthy()
    })

    it('returns capitalized alpha en string', () =>
    {
        const result = str({ size: 5, locale: 'en', type: 'alpha', format: 'capitalized' })

        expect(alphaCapitalizedEnRegex.test(result)).toBeTruthy()
    })
    it('returns capitalized alpha ru string', () =>
    {
        const result = str({ size: 5, locale: 'ru', type: 'alpha', format: 'capitalized' })

        expect(alphaCapitalizedRuRegex.test(result)).toBeTruthy()
    })

    it('returns capitalized alphanumeric en string', () =>
    {
        const result = str({ size: 5, type: 'alphanumeric', format: 'capitalized' })

        expect(alphanumericCapitalizedEnRegex.test(result)).toBeTruthy()
    })
    it('returns capitalized alphanumeric ru string', () =>
    {
        const result = str({ size: 5, locale: 'ru', type: 'alphanumeric', format: 'capitalized' })

        expect(alphanumericCapitalizedRuRegex.test(result)).toBeTruthy()
    })

    it('returns possible null if "nullable" provided', () =>
    {
        jest.spyOn(utils, 'trueOrFalse').mockImplementationOnce(() => true)
        const nullResult = str({ size: 5, nullable: true })
        jest.spyOn(utils, 'trueOrFalse').mockImplementationOnce(() => false)
        const nonNullResult = str({ size: 5, nullable: true })

        expect(nullResult).toBeNull()
        expect(nonNullResult).not.toBeNull()
    })
})
