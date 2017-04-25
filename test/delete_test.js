require('chai').should()
const expect = require('chai').expect
const User = require('../server/models/user')

/* eslint-disable no-unused-expressions */

describe('Deleting records', () => {
  let abc;

  beforeEach((done) => {
    abc = new User({ username: 'ABC' })
    abc.save()
      .then(() => {
        done()
      })
      .catch(err => done(err))
  })

  it('model instance remove', (done) => {
    abc.remove().then(() => User.findById(abc.id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(err => done(err))
  })

  it('class method remove', (done) => {
    User.remove({ username: 'ABC' }).then(() => User.findById(abc._id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(err => done(err))
  })

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ username: 'ABC' })
      .then(() => User.findById(abc._id)).then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(err => done(err))
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(abc._id)
      .then(() => User.findById(abc._id)).then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(err => done(err))
  })
})
