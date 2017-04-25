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

  it('should remove all associated reflections when removing a user', (done) => {
    abc.remove()
      .then(() => Reflection.count()).then((count) => {
        count.should.equal(0)
        done()
      })
      .catch(err => done(err))
  })
})
