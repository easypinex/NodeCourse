const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
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
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(val) {
            if (val.toLowerCase().includes('password'))
                throw new Error('Password doesn\'t contain "password"')
        }
    }
})

const me = new User({ 
    name: 'Perry   ', 
    email: 'perry@gmail.COM   ',
    password: 'Phone!@GOOD'
})
me.save().then(()=>console.log('Saved.', me))

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({ description: '提交OA單', completed: false })
task.save().then(()=>console.log('saved, ', task))