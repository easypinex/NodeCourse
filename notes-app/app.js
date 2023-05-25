const validator = require('validator')
const note = require('./note')
console.log(note())
console.log(validator.isURL('https://mead.io'))