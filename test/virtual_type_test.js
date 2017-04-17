const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')

describe('Virtual types', () => {
	it('postCount returns number of posts', (done) => {
		const abc = new User({
			username: 'ABC',
			reflections: [{content: 'Today was a good day'}]
		})

		abc.save()
			.then(() => User.findOne({ username: 'ABC' }))
			.then((user) => {
				abc.reflectionCount.should.equal(1)
				done()
			})
	})
})