const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User