const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/task-manager-api')
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({ name: 'Perry', age: 'Mike' })
// me.save().then(()=>console.log('Saved.', me))

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({ description: '提交OA單', completed: false })
task.save().then(()=>console.log('saved, ', task))