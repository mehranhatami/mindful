const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../server/models/user')
const Reflection = require('../server/models/reflection')

chai.should();
chai.use(chaiHttp);

describe('Creating records', () => {
  it('saves a user', (done) => {
    const abc = new User({ username: 'ABC' })

    abc.save()
      .then(() => {
        abc.isNew.should.equal(false)
        done()
      })
      .catch(err => done(err))
  })

  it('saves a reflection', (done) => {
    const reflection = new Reflection({})

    reflection.save()
      .then(() => {
        reflection.isNew.should.equal(false)
        done()
      })
      .catch(err => done(err))
  })
})
