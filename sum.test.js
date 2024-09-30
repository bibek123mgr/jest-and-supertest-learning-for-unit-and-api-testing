const sum = require('./sum')

test("addition of two number", () => {
    expect(sum(1, 3)).toBe(4);
})