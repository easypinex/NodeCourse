const express = require('express')
require('./db/mongoose')

const app = express()

const user_router = require('./routers/users')
const task_router = require('./routers/task')

app.use(express.json())
app.use(user_router)
app.use(task_router)


module.exports = app

