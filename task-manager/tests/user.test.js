const requests = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'wtfallday!!'
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