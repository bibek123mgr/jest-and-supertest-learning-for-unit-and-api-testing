const subtract = require('./subtract')

test('subtracting two number', () => {
    expect(subtract(4, 2)).toBe(2)
})