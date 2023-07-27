const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const staticDir = path.join(__dirname, '..', 'public')

app.use(express.static(staticDir))

const filter = new Filter()
io.on('connection', (socket) => {
    console.log('New Socket Connection.')
    // socket.emit('countUpdated', count)
    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message, callback) => {

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (position, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${position.latitude},${position.longitude}`)
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})