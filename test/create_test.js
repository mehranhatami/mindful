const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js').app;

const should = chai.should();
chai.use(chaiHttp);

describe('It should render index.html', function() {

	it('should render hello world', function() {
		return chai.request(app)
			.get('/')
			.end(function(err, res) {
				res.should.have.status(200);
			})
	})
})