const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

const user_router = require('./routers/users')
const task_router = require('./routers/task')

app.use((req, res, next) => {
    res.status(503).send('Server are maintenance!')
})

app.use(express.json())
app.use(user_router)
app.use(task_router)

app.listen(port, () => {
    console.log('Server is up on Port ', port)
})

const jwt = require('jsonwebtoken')
const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'this is my course', { expiresIn: '30 seconds' })
    console.log(token)
    setTimeout(() => {
        const data = jwt.verify(token, 'this is my course')
        console.log(data)
    }, 2000)

}
myFunction()