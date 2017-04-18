const should = require('chai').should()
const User = require('../models/user')
const Reflection = require('../models/reflection')

describe('Reading records', () => {
	let user_1, user_2, reflection_1, reflection_2, reflection_3, reflection_4;

	beforeEach((done) => {
		reflection_1 = new Reflection({content: 'I am happy'})
		reflection_2 = new Reflection({content: 'I am mad'})
		reflection_3 = new Reflection({content: 'I am sad'})
		reflection_4 = new Reflection({content: 'I am fine'})
		user_1 = new User({ username: 'User1', reflections: [reflection_1, reflection_2]})
		user_2 = new User({ username: 'User2', reflections: [reflection_3, reflection_4]})

		Promise.all([user_1.save(), user_2.save(), reflection_1.save(), reflection_2.save(), reflection_3.save(), reflection_4.save()])
			.then(() => done())
	})

	it('finds all users by the name of `User1`', (done) => {
		User.find({ username: 'User1' })
			.then((users) => {
				users[0]._id.toString().should.equal(user_1._id.toString())
				done()
			})
	})

	it('find user with a particular id', (done) => {
		User.findById(user_1._id)
			.then((user) => {
				user.username.should.equal('User1')
				done()
			})
	})

	it('finds all reflections of User1', (done) => {
		User.findById(user_1._id)
			.populate('reflections')
			.then(user =>  {
				user.reflections[0].content.should.equal('I am happy')
				user.reflections[1].content.should.equal('I am mad')
				done()
			})

	})


	it('finds user associated with reflection_3', () => {
		User.findOne({ reflections: { $in: [reflection_3._id] } })
			.then(user => {
				user.username.should.equal('User2')
				done()
			})
	})

})