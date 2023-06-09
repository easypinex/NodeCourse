const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc 
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}
        if (req.query.completed)
            match.completed = req.query.completed === 'true'
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            const sort_col = parts[0]
            const sort_way = parts[1] === 'desc' ? -1 : 1
            sort[sort_col] = sort_way
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
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
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
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

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router