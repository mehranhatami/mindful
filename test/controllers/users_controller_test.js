const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const expect = chai.expect
const app = require('../../server')
const User = require('../../server/models/user')
chai.should()
chai.use(chaiHttp)

describe('The users controller', () => {
  it('handles a POST request to /api/users', (done) => {
    User.count().then(count => {
      chai.request(app)
        .post('/api/users')
        .end((err, res) => {
          if (err) { return done(err) }

          User.count()
            .then(newCount => {
              newCount.should.equal(count + 1)
              done()
            })
            .catch(err => done(err))
        })
    })
  })
  it('handles a PUT request to /api/users/:id', (done) => {
    User.create({ username: 'Test' }).then(user => {
      chai.request(app)
        .put(`/api/users/${user._id}`)
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          if (err) { return done(err) }

          User.findById(user._id)
            .then(updatedUser => {
              updatedUser.email.should.equal('test@test.com')
              done()
            })
            .catch(err => done(err))
      })
    })
  })
  it('handles a DELETE request to /api/user/:id', (done) => {
    User.create({ username: 'Test' }).then(user => {
      chai.request(app)
        .delete(`/api/users/${user._id}`)
        .end((err, res) => {
          if (err) { return done(err) }

          User.findById(user._id)
            .then(deletedUser => {
              expect(deletedUser).to.be.null
              done()
            })
            .catch(err => done(err))
      })
    })
  })
  it('handles a GET request to /api/users', (done) => {
    const testUser1 = new User({
      username: 'Test1',
      email: 'test1@test.com'
    })
    const testUser2 = new User({
      username: 'Test2',
      email: 'test2@test.com'
    })
    Promise.all([testUser1.save(), testUser2.save()])
      .then(users => {
        chai.request(app)
          .get('/api/users?username=Test1')
          .end((err, res) => {
            if (err) { return done(err) }
            res.body.length.should.equal(1)
            res.body[0].obj.email.should.equal('test1@test.com')
            done()
          })
      })
      .catch(err => done(err))
  })
})
