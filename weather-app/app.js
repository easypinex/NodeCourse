const request = require('request')
// const url = 'http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=fetch:ip&units=f'
// request({'url': url}, (error, response) => {
//     const data = JSON.parse(response.body)
//     console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
// })

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWFzeXBpbmV4IiwiYSI6ImNsaWNzN2lpdjBnNnYzaHF2bGNrdGhseTIifQ.ldFtXeV-Qm2vEq6kCG3kAw'
request({url: url, json:true}, (error, response) => {
    const data = response.body
    console.log(`Latitude: ${data.features[0].center[1]}, Longtitude: ${data.features[0].center[0]}`)
})