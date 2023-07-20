const express = require('express')
const path =  require('path')

const app = express()
const port = process.env.PORT || 3000
const staticDir = path.join(__dirname, '..', 'public')

app.use(express.static(staticDir))

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})