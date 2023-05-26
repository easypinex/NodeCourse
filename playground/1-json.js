const fs = require('fs')

// // Define dictionary 
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }
// // Transform to json string
// const bookJson = JSON.stringify(book)
// Write to file
// fs.writeFileSync('1-json.json', bookJson)
// Read from file
const dataBuffer = fs.readFileSync('1-json.json')
// Transform to json string
const dataJson = dataBuffer.toString()
// Transform to json
const data = JSON.parse(dataJson);
data.name = 'Perry'
data.age = 28
fs.writeFileSync('1-json.json', JSON.stringify(data))