const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js').app;
const User = require('../models/user')
const Reflection = require('../models/reflection')

const should = chai.should();
chai.use(chaiHttp);

describe('Creating records', function() {

	it('saves a user', function() {
		const abc = new User({ username: 'ABC' })

		abc.save()
			.then(() => {
				abc.isNew.should.equal(false)
				done()
			})
	})

	it('saves a reflection', function() {
		const reflection = new Reflection({})

		reflection.save()
			.then(() => {
				reflection.isNew.should.equal(false)
				done()
			})
	})
})