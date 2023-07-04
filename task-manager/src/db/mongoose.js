const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')
const User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) 
                throw new Error('Email is invalid.')
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if (val < 0) throw new Error('Age must be postive number')
        }
    }
})

const me = new User({ 
    name: 'Perry   ', 
    email: 'perry@gmail.COM   ' 
})
me.save().then(()=>console.log('Saved.', me))

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const task = new Task({ description: '提交OA單', completed: false })
// task.save().then(()=>console.log('saved, ', task))