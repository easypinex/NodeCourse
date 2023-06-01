const request = require('request')
const weather_url = 'http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=fetch:ip&units=f'
request({'url': weather_url, json:true}, (error, response) => {
    if (error) {
        if (error.body && error.body.info) {
            console.log(error.body.info)
            return
        }
        console.log('Unalbe to connect to weather service!')
        return;
    }
    const data = response.body
    console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
})

const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWFzeXBpbmV4IiwiYSI6ImNsaWNzN2lpdjBnNnYzaHF2bGNrdGhseTIifQ.ldFtXeV-Qm2vEq6kCG3kAw'
request({url: geo_url, json:true}, (error, response) => {
   
    const data = response.body
    console.log(`Latitude: ${data.features[0].center[1]}, Longtitude: ${data.features[0].center[0]}`)
})