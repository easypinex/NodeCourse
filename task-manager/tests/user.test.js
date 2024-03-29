const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)
test('Should signup a new user', async () => {
    // Check response
    const response = await request(app)
        .post('/users')
        .send({
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
    const response = await request(app).post('/users/login').send({
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
    await request(app).post('/users/login').send({
        email: 'nonexistuser@gmail.com',
        password: 'somepasswor'
    }).expect(400)
})

test('Sholud get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Sholud not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Sholud delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Sholud not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should upload valid user files', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Mika'
        })
        .expect(200)
    expect(response.body.name).toBe('Mika')
    const user = await User.findById(userOne._id)
    expect(user.name).toEqual('Mika')
})

test('Should not upload invalid user files', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Monika'
        })
        .expect(400)
})