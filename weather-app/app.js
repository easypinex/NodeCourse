
const geocode = require('./utils/geocode')
// const weather_url = 'http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=fetch:ip&units=f'
// request({'url': weather_url, json:true}, (error, response) => {
//     if (error) {
//         if (error.body && error.body.info) {
//             console.log(error.body.info)
//             return
//         }
//         console.log('Unalbe to connect to weather service!')
//         return;
//     }
//     const data = response.body
//     console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
// })

geocode('新北市板橋區莒光路135號3樓', (error, data) => {
    console.log(error);
    console.log(data)
})