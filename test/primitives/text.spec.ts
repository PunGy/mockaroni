import { text, wordsSet } from '@src/primitives/text'

describe('text', () =>
{
    it('returns text of set size with default values', () =>
    {
        const result = text({ size: 10 })

        const resultSplit = result.split(' ')
        expect(resultSplit.length === 10).toBeTruthy()
        expect(resultSplit.every(word => wordsSet.words.includes(word)))
    })

    it('returns names', () =>
    {
        const resultMixed = text({ size: 10, type: 'names', namesGender: 'mixed' })
        const resultFemale = text({ size: 10, type: 'names', namesGender: 'female' })
        const resultMale = text({ size: 10, type: 'names', namesGender: 'male' })

        expect(resultMixed.split(' ').every(name => wordsSet.names.mixed.includes(name)))
        expect(resultFemale.split(' ').every(name => wordsSet.names.female.includes(name)))
        expect(resultMale.split(' ').every(name => wordsSet.names.male.includes(name)))
    })

    it('returns with custom word list', () =>
    {
        const customWordsSet = { words: ['word1', 'word2', 'word3'] }
        const result = text({
            size: 10,
            type: 'names',
            wordsSet: customWordsSet,
            namesGender: 'mixed',
        })

        expect(result.split(' ').every(word => customWordsSet.words.includes(word)))
    })

    it('returns random string words', () =>
    {
        const result = text({
            size: 10,
            type: 'random_string',
        })

        expect(result.split(' ').every(word => (/^[a-z]+$/).test(word)))
    })

    it('returns capitalized text', () =>
    {
        const result = text({
            size: 10,
            capitalized: true,
        })

        expect(result[0] === result[0].toUpperCase()).toBeTruthy()
    })
})