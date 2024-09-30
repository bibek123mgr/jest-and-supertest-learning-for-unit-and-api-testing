const array = require('./array')

test('check array', () => {
    const data = [1, 2, 3]
    expect(array(data)).not.toBe(data)
    expect(array(data)).toEqual(data)
})