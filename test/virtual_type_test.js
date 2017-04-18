const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')
const Reflection = require('../models/reflection')

describe('Virtual types', () => {
	it('reflectionCount returns number of posts', (done) => {
		const reflection = new Reflection({content: 'Today was a good day'})
		const abc = new User({
			username: 'ABC',
			reflections: [reflection]
		})

		abc.save()
			.then(() => User.findOne({ username: 'ABC' }))
			.then((user) => {
				abc.reflectionCount.should.equal(1)
				done()
			})
	})
})