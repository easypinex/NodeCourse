const https = require('http')

const weather_url = `http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=fetch:ip`

const request = https.request(weather_url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk.toString();
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log('body', body);
    })
})

request.on('error', (error)=>{
    console.log('An error', error)
})

request.end()