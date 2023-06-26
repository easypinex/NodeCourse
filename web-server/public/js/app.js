console.log('Client side javascript file is loaded!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    if (!address) return console.log('You must give search value')
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWFzeXBpbmV4IiwiYSI6ImNsaWNzN2lpdjBnNnYzaHF2bGNrdGhseTIifQ.ldFtXeV-Qm2vEq6kCG3kAw`).then(
    (response) => {
        response.json().then(data => {
            if (data.error) return console.log(data.error)
            const location = data.features[0].place_name
            const latitude = data.features[0].center[1];
            const longtitude = data.features[0].center[0];
            const weather_url = `http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=${latitude},${longtitude}`
            fetch(weather_url).then((response) => {
                response.json().then(data => {
                    if (data.error) return console.log(data.error)
                    const forecast = data.current.weather_descriptions[0]
                    console.log( {
                        location,
                        forecast
                    })
                })
            })
        })
    }
)
})