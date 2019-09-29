import { isQuoteAuthor } from './contentful'

describe('isQuoteAuthor identifies author strings correctly', () => {
  test('whole string', () => {
    expect(isQuoteAuthor('-')).toBe(true)
    expect(isQuoteAuthor('–')).toBe(true)
    expect(isQuoteAuthor('—')).toBe(true)
    expect(isQuoteAuthor('―')).toBe(true)
  })
  test('full string', () => {
    expect(isQuoteAuthor('- Quote Author')).toBe(true)
    expect(isQuoteAuthor('– Quote Author')).toBe(true)
    expect(isQuoteAuthor('— Quote Author')).toBe(true)
    expect(isQuoteAuthor('― Quote Author')).toBe(true)
  })
  test('Dash later in the string', () => {
    expect(isQuoteAuthor('Something -')).toBe(false)
    expect(isQuoteAuthor('Something –')).toBe(false)
    expect(isQuoteAuthor('Something —')).toBe(false)
    expect(isQuoteAuthor('Something ―')).toBe(false)
  })
})
