/* eslint-disable consistent-returns*/

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../server')
const Reflection = require('../../server/models/reflection')
const User = require('../../server/models/user')
chai.should()
chai.use(chaiHttp)

describe('The reflections controller', () => {
  let joe
  let reflection

  beforeEach((done) => {
    joe = new User({ username: 'Joe' })
    reflection = new Reflection({ content: 'today was a good day' })
    Promise.all([joe.save(), reflection.save()])
      .then(() => done())
      .catch(error => done(error))
  })

  it('handles a GET request to /api/refelctions', (done) => {
    chai.request(app)
      .get('/api/reflections')
      .end((err, res) => {
        if (err) { return done(err) }
        res.body.length.should.equal(1)
        res.body[0].content.should.equal('today was a good day')
        return done()
      })
  })

  it('handles a GET request to /api/refelctions/:id', (done) => {
    chai.request(app)
      .get(`/api/reflections/${reflection._id}`)
      .end((err, res) => {
        if (err) { return done(err) }
        res.body.content.should.equal('today was a good day')
        res.body._id.should.equal(reflection._id.toString())
        return done()
      })
  })

  it('handles a POST request to /api/reflections', (done) => {
    Reflection.count().then(count => {
      chai.request(app)
        .post('/api/reflections')
        .send({ user: joe._id, content: 'today was a good day' })
        .end((err) => {
          if (err) { return done(err) }
          Reflection.count()
            .then(newCount => {
              newCount.should.equal(count + 1)
              done()
            })
            .catch(error => done(error))
        })
    })
    .catch(error => done(error))
  })

  it('handles a PUT request to /api/reflections/:id', (done) => {
    chai.request(app)
      .put(`/api/reflections/${reflection._id}`)
      .send({ habit: { sleep: true } })
      .end((err) => {
        if (err) { return done(err) }
        Reflection.findById(reflection._id)
          .then(updatedReflection => {
            updatedReflection.habit.sleep.should.equal(true)
            done()
          })
          .catch(error => done(error))
      })
  })

  it('handles a DELETE request to /api/reflections/:id', (done) => {
    chai.request(app)
      .delete(`/api/reflections/${reflection._id}`)
      .end((err) => {
        if (err) { return done(err) }
        Reflection.findById(reflection._id)
          .then(deletedReflection => {
            /* eslint-disable no-unused-expressions*/
            expect(deletedReflection).to.be.null
            done()
          })
          .catch(error => done(error))
      })
  })
})
