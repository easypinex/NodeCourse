const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const staticDir = path.join(__dirname, '..', 'public')

app.use(express.static(staticDir))

io.on('connection', () => {
    console.log('New Socket Connection.')
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})