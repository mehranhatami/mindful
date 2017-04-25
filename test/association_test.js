require('chai').should()
const User = require('../server/models/user')
const Reflection = require('../server/models/reflection')

describe('Associations', () => {
  let abc
  let reflection

  beforeEach((done) => {
    abc = new User({ username: 'ABC' })
    reflection = new Reflection({
      content: 'Today was a good day',
      habit: {
        sleep: true,
        exercise: true,
        diet: true,
        meditation: true
      }
    })

    abc.reflections.push(reflection)

    Promise.all([abc.save(), reflection.save()])
      .then(() => done())
      .catch(err => done(err))
  })

  it('should save a relation between a user and a reflection', (done) => {
    User.findOne({ username: 'ABC' })
      .populate('reflections')
      .then((user) => {
        user.reflections[0].content.should.equal('Today was a good day')
        done()
      })
      .catch(err => done(err))
  })
})
