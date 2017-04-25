require('chai').should()
const User = require('../server/models/user')
const Reflection = require('../server/models/reflection')

describe('Virtual types', () => {
  it('reflectionCount returns number of posts', (done) => {
    const reflection = new Reflection({ content: 'Today was a good day' })
    const abc = new User({ username: 'ABC', reflections: [reflection] })

    abc.save()
      .then(() => User.findOne({ username: 'ABC' })).then(() => {
        abc.reflectionCount.should.equal(1)
        done()
      })
      .catch(err => done(err))
  })
})
