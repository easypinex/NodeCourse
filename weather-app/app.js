const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=fetch:ip'
request({'url': url}, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(`It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
})