const fs = require('fs')

// Define dictionary 
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}
// Transform to json string
const bookJson = JSON.stringify(book)
// Write to file
fs.writeFileSync('1-json.json', bookJson)
// Read from file
const dataBuffer = fs.readFileSync('1-json.json')
// Transform to json string
const dataJson = dataBuffer.toString()
// Transform to json
const data = JSON.parse(dataJson);
// Get property form json
console.log(data.title)