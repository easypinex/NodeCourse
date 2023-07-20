const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'wtfallday!!',
    tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse999@@',
    tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'unit test first task - for user 1',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'unit test two task - for user 1',
    completed: true,
    owner: userOneId
}

const taskThird = {
    _id: new mongoose.Types.ObjectId(),
    description: 'unit test third task  - for user 2',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThird).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}