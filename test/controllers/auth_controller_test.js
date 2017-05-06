/* eslint-disable consistent-return*/

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../server')
const User = require('../../server/models/user')
chai.should()
chai.use(chaiHttp)

describe('The auth controller', () => {
  let joe
  let bob

  beforeEach((done) => {
    joe = new User({
      username: 'Joe',
      email: 'Joe@test.com',
      password: 'password123'
    })
    bob = new User({
      username: 'Bob',
      email: 'Bob@test.com',
      password: 'password456'
    })

    Promise.all([joe.save(), bob.save()])
      .then(() => done())
      .catch(error => done(error))
  })

  it('should authenticate a user', (done) => {
    chai.request(app)
      .post('/api/auth')
      .send({ username: 'Joe', password: 'password123' })
      .end((err, res) => {
        if (err) { return done(err) }
        res.body.username.should.equal('Joe')
        return done()
      })
  })

  it('should not authenticate due to wrong password', (done) => {
    chai.request(app)
      .post('/api/auth')
      .send({ username: 'Joe', password: 'wrong' })
      .end((err, res) => {
        res.status.should.equal(401)
        return done()
      })
  })

  it('should notify that user does not exist', (done) => {
    chai.request(app)
      .post('/api/auth')
      .send({ username: 'John', password: 'testing' })
      .end((err, res) => {
        res.status.should.equal(403)
        return done()
      })
  })
})
