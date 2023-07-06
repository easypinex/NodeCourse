require('../src/db/mongoose')
const Task = require('../src/models/task')
// Task.findByIdAndRemove('64a3877d444e09b1997c41d9').then(task => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const taslk = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('64a3e6aa2e085dbc8054e5cc').then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})