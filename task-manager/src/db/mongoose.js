const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/task-manager-api')
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({ name: 'Perry', age: 'Mike' })
me.save().then(()=>console.log('Saved.', me))
