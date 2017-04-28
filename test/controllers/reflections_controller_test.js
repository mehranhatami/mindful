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

  beforeEach((done) => {
    joe = new User({ username: 'Joe' })
    joe.save()
      .then(() => {
        done()
      })
      .catch(err => done(err))
  })

  it('handles a POST request to /api/reflections', (done) => {
    Reflection.count().then(count => {
      chai.request(app)
        .post('/api/reflections')
        .send({ user: joe._id, content: 'today was a good day' })
        .end((err, res) => {
          console.log(res.body)
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

  xit('handles a PUT request to /api/:user/reflections/:id', (done) => {
    Reflection.create({ content: 'Test' }).then(reflection => {
      chai.request(app)
        .put(`/api/:user/reflections/${reflection._id}`)
        .send({ sleep: true })
        .end((err, res) => {
          if (err) { return done(err) }

          Reflection.findById(reflection._id)
            .then(updatedReflection => {
              updatedReflection.sleep.should.equal(true)
              done()
            })
            .catch(err => done(err))
      })
    })
  })
  xit('handles a DELETE request to /api/:user/reflections/:id', (done) => {
    Reflection.create({ content: 'Test' }).then(user => {
      chai.request(app)
        .delete(`/api/:user/reflections/${user._id}`)
        .end((err, res) => {
          if (err) { return done(err) }

          Reflection.findById(reflection._id)
            .then(deletedReflection => {
              expect(deletedReflection).to.be.null
              done()
            })
            .catch(err => done(err))
      })
    })
  })
  xit('handles a GET request to /api/:user/reflections', (done) => {
    const testReflection1 = new Reflection({
      content: 'Test1',
    })
    const testReflection2 = new Reflection({
      content: 'Test2',
    })
    Promise.all([testReflection1.save(), testReflection2.save()])
      .then(reflections => {
        chai.request(app)
          .get('/api/:user/reflections?content=Test1')
          .end((err, res) => {
            if (err) { return done(err) }
            res.body.length.should.equal(1)
            res.body[0].obj.content.should.equal('Test1')
            done()
          })
      })
      .catch(err => done(err))
  })
})
