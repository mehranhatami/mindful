const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')
const Reflection = require('../models/reflection')
const Habit = require('../models/habit')

describe('Associations', () => {
	let abc, reflection, habit

	beforeEach((done) => {
		abc = new User({ username: 'ABC' })
		reflection = new Reflection({ content: 'Today was a good day', habit: habit })
		habit = new Habit({sleep: true,exercise: true, diet: true, meditation: true })

		abc.reflections.push(reflection)

		Promise.all([abc.save(), reflection.save(), habit.save()])
			.then(() => done())
	})

	it('should save a relation between a user and a reflection', (done) => {
		User.findOne({ username: 'ABC'})
			.populate('reflctions')
			.then((user) => {
				user.reflctions[0].content.should.equal('Today was a good day')
				done()
			})
	})

	it('should have a full relation graph', (done) => {
		User.findOne({ username: 'ABC' })
		.populate({
			path: 'reflections',
			populate: {
				path: 'habits'
				model: 'habit'
			}
		})
		.then((user) => {
			user.reflections[0].content.should.equal('Today was a good day')
			user.reflctions[0].habit.should.equal({sleep: true,exercise: true, diet: true, meditation: true })
			done()
		})
	})
})