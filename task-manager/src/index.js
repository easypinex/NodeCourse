const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

const user_router = require('./routers/users')
const task_router = require('./routers/task')

app.use(express.json())
app.use(user_router)
app.use(task_router)

app.listen(port, () => {
    console.log('Server is up on Port ', port)
})

const bcrypt = require('bcrypt')

const myFunction = async () => {
    const pass = 'Red12345'
    const result = await bcrypt.hash(pass, 8)
    console.log(result)
    const issame = await bcrypt.compare(pass, result)
    console.log('issame' ,issame)
}

myFunction()