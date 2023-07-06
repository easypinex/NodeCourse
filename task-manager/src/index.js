const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send()
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const updates = Object.keys(res.body)
        const allow_updates = ['name', 'age', 'password', 'email']
        const valid = updates.every((update) => allow_updates.includes(update))
        if (!valid) res.status(400).send({ error: 'Invalid updates!' })
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).send()
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allow_update = ['description', 'completed']
        const valid = updates.every(update => allow_update.includes(update))
        if (!valid) res.status(400).send('Invalid Updates!')
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on Port ', port)
})