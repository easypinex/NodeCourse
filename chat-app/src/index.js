const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { addUser, getUser, getUsersInRoom, removeUser } = require('./utils/user')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const staticDir = path.join(__dirname, '..', 'public')

app.use(express.static(staticDir))

const filter = new Filter()
io.on('connection', (socket) => {
    console.log('New Socket Connection.')


    socket.on('join', (options, callback) => {
        const { error, user } =  addUser({ id: socket.id, ...options })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        // socket.emit io.emit socket.broadcast.emit
        // io.to.emit socket.broadcast.to.emit

        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        socket.emit('message', generateMessage('Admin', 'Welcome!'))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${position.latitude},${position.longitude}`))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.usernmae} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
        
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})