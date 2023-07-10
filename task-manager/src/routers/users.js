const express = require('express')
const User = require('../models/user')
const routers = new express.Router()
const auth = require('../middleware/auth')

routers.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
})

routers.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

routers.patch('/users/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allow_updates = ['name', 'age', 'password', 'email']
        const valid = updates.every((update) => allow_updates.includes(update))
        if (!valid) return res.status(400).send({ error: 'Invalid updates!' })

        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
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