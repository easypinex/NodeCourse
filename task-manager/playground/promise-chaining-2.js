require('../src/db/mongoose')
const Task = require('../src/models/task')
Task.findByIdAndRemove('64a3877d444e09b1997c41d9').then(task => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})