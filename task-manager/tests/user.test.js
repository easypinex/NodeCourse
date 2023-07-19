const requests = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'wtfallday!!',
    tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    // Check response
    const response = await requests(app).post('/users').send({
        name: 'Perry',
        email: 'perry@test.com',
        password: 'mygoodpasshere'
    }).expect(201)
    // Check Database 
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'Perry',
            email: 'perry@test.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mygoodpasshere')
})

test('Sholud login existing user', async () => {
    const response = await requests(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: userOne.name,
            email: userOne.email,
        },
        token: user.tokens[1].token
    })
    expect(user.password).not.toBeNull()
    expect(user.password).not.toBe(userOne.password)
})

test('Sholud not login nonexisting user', async () => {
    await requests(app).post('/users/login').send({
        email: 'nonexistuser@gmail.com',
        password: 'somepasswor'
    }).expect(400)
})

test('Sholud get profile for user', async () => {
    await requests(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('Sholud not get profile for unauthenticated user', async() => {
    await requests(app)
            .get('/users/me')
            .send()
            .expect(401)
})

test('Sholud delete account for user', async() => {
    const response = await requests(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Sholud not delete account for unauthenticated user', async() => {
    await requests(app)
            .delete('/users/me')
            .send()
            .expect(401)
})