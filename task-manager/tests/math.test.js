const { calculateTip } = require('../src/math')

test('Should caclulate total with tip', () => {
    const total = calculateTip(10, .3)
    // if (total !== 13)
    //     throw new Error('Totla Sholud be 13. Got ' + total)
    expect(total).toBe(13)
})

test('Should caclulate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})