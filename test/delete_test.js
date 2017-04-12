const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Deleting records', () => {
	let abc;

	beforeEach((done) => {
		abc = new User({name: 'ABC' })
		abc.save()
			.then(() => { done() })
	})

	it('model instance remove', (done) => {
		abc.remove()
			.then(() = User.findById(abc.id))
			.then(user => {
				expect(user).to.be.null
				.done()
			})
	})

	it('class method remove', (done) => {
		User.remove({ name: 'ABC' })
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				.done()
			})
	})

	it('class method findAndRemove', (done) => {
		User.findAndRemove({ name: 'ABC' })
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				.done()
			})
	})

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(abc._id)
			.then(() => User.findById(abc._id))
			.then(user => {
				expect(user).to.be.null
				.done()
			})
	})

})
