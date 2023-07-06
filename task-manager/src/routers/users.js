const express = require('express')
const User = require('../models/user')
const routers = new express.Router()

routers.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e)
    }
})

routers.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send()
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.patch('/users/:id', async (req, res) => {
    try {
        const updates = Object.keys(res.body)
        const allow_updates = ['name', 'age', 'password', 'email']
        const valid = updates.every((update) => allow_updates.includes(update))
        if (!valid) return res.status(400).send({ error: 'Invalid updates!' })
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = routers