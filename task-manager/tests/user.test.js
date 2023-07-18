const requests = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await requests(app).post('/users').send({
        name: 'Perry',
        email: 'easypinex@gmail.com',
        password: 'mygoodpasshere'
    }).expect(201)
})