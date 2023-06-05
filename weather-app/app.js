
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


geocode('新北市板橋區莒光路135號3樓', (error, data) => {
    if (error) {
        console.log(error);
        return
    }
    console.log(data)
})

forecast(121.470305, 25.024852, (error, data) => {
    if (error) {
        console.log(error);
        return
    }
    console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
})