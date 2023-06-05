
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

if (process.argv.length < 3) 
    return console.log('Enter location in argv')
const location = process.argv[2]

geocode(location, (error, data) => {
    if (error) {
        return console.log(error);
    }
    forecast(data.longtitude, data.latitude, (error, data) => {
        if (error) {
            return console.log(error);
        }
        console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`)
    })
})

