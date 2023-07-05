require('../src/db/mongoose')
const User = require('../src/models/user')
User.findByIdAndUpdate('64a3ceb372d0aeb21c9f26bc', {
    age: 1
}).then(user => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})