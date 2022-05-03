import { str } from '@src/primitives/str'
import { checkNullable } from '../testUtils/checkNullable'

const alphanumericLowercaseLatinRegex = /^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$/ // default
const alphanumericLowercaseCyrillicRegex = /^(?=.*[0-9])(?=.*[а-яё])([а-яё0-9]+)$/
const alphanumericUppercaseLatinRegex = /^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]+)$/
const alphanumericUppercaseCyrillicRegex = /^(?=.*[0-9])(?=.*[А-ЯЁ])([А-ЯЁ0-9]+)$/
const alphanumericMixedLatinRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
const alphanumericMixedCyrillicRegex = /^(?=.*[0-9])(?=.*[а-яёА-ЯЁ])([а-яёА-ЯЁ0-9]+)$/

const numericRegex = /^[0-9]+$/

const alphaLowercaseLatinRegex = /^[a-z]+$/
const alphaLowercaseCyrillicRegex = /^[а-яё]+$/
const alphaCapitalizedCyrillicRegex = /^[А-ЯË][а-яё]+$/
const alphaUppercaseLatinRegex = /^[A-Z]+$/
const alphaCapitalizedLatinRegex = /^[A-Z][a-z]+$/
const alphaUppercaseCyrillicRegex = /^[А-ЯЁ]+$/
const alphaMixedLatinRegex = /^[A-Za-z]+$/
const alphaMixedCyrillicRegex = /^[А-Яа-яёЁ]+$/

describe('str', () =>
{
    it('returns string of provided size and default presets', () =>
    {
        const size = 10
        const result = str({ size })

        expect(result.length).toBe(size)
        expect(alphaLowercaseLatinRegex.test(result)).toBeTruthy()
    })

    it('returns numeric string', () =>
    {
        const result = str({ size: 5, type: 'numeric' })

        expect(numericRegex.test(result)).toBeTruthy()
    })

    describe('cyrillic', () =>
    {
        it('returns cyrillic alpha string', () =>
        {
            const result = str({ size: 5, type: 'alpha', locale: 'cyrillic' })

            expect(alphaLowercaseCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns cyrillic alphanumeric string', () =>
        {
            const result = str({ size: 10, locale: 'cyrillic', type: 'alphanumeric' })

            expect(alphanumericLowercaseCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns uppercase alpha cyrillic string', () =>
        {
            const result = str({ size: 5, locale: 'cyrillic', type: 'alpha', format: 'uppercase' })

            expect(alphaUppercaseCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns uppercase alphanumeric cyrillic string', () =>
        {
            const result = str({ size: 10, locale: 'cyrillic', type: 'alphanumeric', format: 'uppercase' })

            expect(alphanumericUppercaseCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns mixed alphanumeric cyrillic string', () =>
        {
            const result = str({ size: 20, locale: 'cyrillic', type: 'alphanumeric', format: 'mixed' })

            expect(alphanumericMixedCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns mixed alpha cyrillic string', () =>
        {
            const result = str({ size: 10, locale: 'cyrillic', type: 'alpha', format: 'mixed' })

            expect(alphaMixedCyrillicRegex.test(result)).toBeTruthy()
        })
        it('returns capitalized alpha cyrillic string', () =>
        {
            const result = str({ size: 10, locale: 'cyrillic', type: 'alpha', format: 'capitalized' })

            expect(alphaCapitalizedCyrillicRegex.test(result)).toBeTruthy()
        })
    })

    describe('latin', () =>
    {
        it('returns latin alpha string', () =>
        {
            const result = str({ size: 5, locale: 'latin', type: 'alpha' })

            expect(alphaLowercaseLatinRegex.test(result)).toBeTruthy()
        })
        it('returns latin alphanumeric string', () =>
        {
            const result = str({ size: 20, locale: 'latin', type: 'alphanumeric' })

            expect(alphanumericLowercaseLatinRegex.test(result)).toBeTruthy()
        })
        it('returns uppercase alpha latin string', () =>
        {
            const result = str({ size: 5, locale: 'latin', type: 'alpha', format: 'uppercase' })

            expect(alphaUppercaseLatinRegex.test(result)).toBeTruthy()
        })
        it('returns uppercase alphanumeric latin string', () =>
        {
            const result = str({ size: 20, locale: 'latin', type: 'alphanumeric', format: 'uppercase' })

            expect(alphanumericUppercaseLatinRegex.test(result)).toBeTruthy()
        })
        it('returns mixed alphanumeric latin string', () =>
        {
            const result = str({ size: 30, locale: 'latin', type: 'alphanumeric', format: 'mixed' })

            expect(alphanumericMixedLatinRegex.test(result)).toBeTruthy()
        })
        it('returns mixed alpha latin string', () =>
        {
            const result = str({ size: 10, locale: 'latin', type: 'alpha', format: 'mixed' })

            expect(alphaMixedLatinRegex.test(result)).toBeTruthy()
        })
        it('returns capitalized alpha latin string', () =>
        {
            const result = str({ size: 10, locale: 'latin', type: 'alpha', format: 'capitalized' })

            expect(alphaCapitalizedLatinRegex.test(result)).toBeTruthy()
        })
    })

    it('returns possible null if "nullable" provided', checkNullable(str, { size: 5 }))
})
