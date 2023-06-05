
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

if (process.argv.length < 3)
    return console.log('Enter location in argv')
const location = process.argv[2]

geocode(location, (error, data) => {
    if (error) {
        return console.log(error);
    }
    const { longtitude, latitude } = data;
    forecast(longtitude, latitude, (error, forecastData) => {
        if (error) {
            return console.log(error);
        }
        const { current } = forecastData;
        const { weather_descriptions, temperature, feelslike } = current;
        console.log(`${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`)
    })
})

