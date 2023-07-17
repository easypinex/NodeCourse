const express = require('express')
const User = require('../models/user')
const routers = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomEmail, sendCancelationEmail } = require('../emails/account')

routers.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
})

routers.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save();
        sendWelcomEmail(user.email, user.name)
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

routers.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

routers.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

routers.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar)
            throw Error()
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.stats(404).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Please uplaod a Image File'), false)
        cb(undefined, true)
    }
})

routers.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

routers.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

routers.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allow_updates = ['name', 'age', 'password', 'email']
        const valid = updates.every((update) => allow_updates.includes(update))
        if (!valid) return res.status(400).send({ error: 'Invalid updates!' })

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

routers.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = routers