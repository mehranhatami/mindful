const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')
const Reflection = require('../models/reflection')


describe('Associations', () => {
	let abc, reflection

	beforeEach((done) => {
		abc = new User({ username: 'ABC' })
		reflection = new Reflection({ content: 'Today was a good day', habit: {sleep: true,exercise: true, diet: true, meditation: true } })

		abc.reflections.push(reflection)

		Promise.all([abc.save(), reflection.save()])
			.then(() => done())
	})

	it('should save a relation between a user and a reflection', (done) => {
		User.findOne({ username: 'ABC'})
			.populate('reflections')
			.then((user) => {
				user.reflections[0].content.should.equal('Today was a good day')
				done()
			})
	})

})