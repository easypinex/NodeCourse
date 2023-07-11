const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks')
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) return res.status(404).send()
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allow_update = ['description', 'completed']
        const valid = updates.every(update => allow_update.includes(update))
        if (!valid) return res.status(400).send('Invalid Updates!')
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if (!task) return res.status(404).send()
        updates.forEach(update => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router