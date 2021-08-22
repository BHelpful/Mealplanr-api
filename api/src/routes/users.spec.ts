import log from '../logger';
import request from 'supertest';
import chai from 'chai';

const assert = chai.assert;
const expect = chai.expect;

const app = require('../app.ts');
const conn = require('../connect.ts');

describe('POST /users', () => {
	before((done) => {
		conn.connectDB()
			.then(() => done())
			.catch((err: any) => done(err));
	});

	after((done) => {
		conn.closeDB()
			.then(() => done())
			.catch((err: any) => done(err));
	});

	it('OK, creating a new user works', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'test@test.test',
				password: '123456',
				passwordconfirmation: '123456',
			})
			.then((res: { body: any }) => {
				const body = res.body;
				expect(body).to.have.property('_id');
				expect(body).to.have.property('_id');
				expect(body).to.have.property('colectionId');
				expect(body).to.have.property('availableIngredientsId');
				expect(body).to.have.property('email');
				expect(body).to.have.property('createdAt');
				expect(body).to.have.property('updatedAt');
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Fail, user already exists', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'test@test.test',
				password: '123456',
				passwordconfirmation: '123456',
			})
			.then((res) => {
				expect(res.body).to.not.have.property('_id');
				done();
			})
			.catch((err) => done(err));
	});
});
