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

  xit('should authenticate a user', (done) => {
    chai.request(app)
      .post('/api/auth')
      .send({ username: 'Joe', password: 'password123' })
      .end((err) => {
        if (err) { return done(err) }
        User.count()
          .then(newCount => {
            newCount.should.equal(count + 1)
            done()
          })
          .catch(error => done(error))
      })
  })
})
