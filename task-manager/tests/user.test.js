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
    await requests(app).post('/users').send({
        name: 'Perry',
        email: 'perry@test.com',
        password: 'mygoodpasshere'
    }).expect(201)
})

test('Sholud login existing user', async () => {
    await requests(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
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