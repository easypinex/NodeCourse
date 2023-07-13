const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

const user_router = require('./routers/users')
const task_router = require('./routers/task')

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})
// app.use((req, res, next) => {
//     res.status(503).send('Server are maintenance!')
// })

app.use(express.json())
app.use(user_router)
app.use(task_router)

app.listen(port, () => {
    console.log('Server is up on Port ', port)
})