const should = require('chai').should()
const expect = require('chai').expect
const User = require('../models/user')

describe('Deleting records', () => {
	let abc;

	beforeEach((done) => {
		abc = new User({username: 'ABC' })
		abc.save()
			.then(() => { done() })
	})

	it('model instance remove', (done) => {
		abc.remove()
			.then(() => User.findById(abc.id))
			.then(user => {
				expect(user).to.be.null
				done()
			})
	})

	it('class method remove', (done) => {
		User.remove({ username: 'ABC' })
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				done()
			})
	})

	it('class method findOneAndRemove', (done) => {
		User.findOneAndRemove({ username: 'ABC' })
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				done()
			})
	})

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(abc._id)
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				done()
			})
	})

})
