const { calculateTip, 
        fahrenheitToCelsius,
        celsiusToFahrenheit } = require('../src/math')

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

test('Should convert 32 F to 0 C', () => {
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const fahrenheit = celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})