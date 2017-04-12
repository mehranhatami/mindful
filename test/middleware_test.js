const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')
const Reflection = require('../models/reflection')
const Habit = require('../models/habit')

describe('Associations', () => {
	let abc, reflection, habit

	beforeEach((done) => {
		abc = new User({ name: 'ABC' })
		reflection = new Reflection({ content: 'Today was a good day', habit: habit })
		habit = new Habit({sleep: true,exercise: true, diet: true, meditation: true })

		abc.reflections.push(reflection)

		Promise.all([abc.save(), reflection.save(), habit.save()])
			.then(() => done())
	})

	it('should remove all associated reflections when removing a user', (done) => {
		abc.remove()
			.then(() => Reflection.count())
			.then((count) => {
				count.shold.equal(0)
				done()
			})
	})
})