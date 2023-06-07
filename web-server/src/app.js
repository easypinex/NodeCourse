const express = require('express')
const path = require('path')
const hbs = require('hbs')


const app = express()
// Define path for Express config
const staticDir = path.join(__dirname ,'..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Perry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Perry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        notice: '大家都要互相幫助',
        name: 'Perry'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'forcast',
        location: 'location'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})