import request from 'supertest';
import app from '../app';

const conn = require('../connect.ts');

describe('POST /users', () => {
	beforeAll((done) => {
		conn.connectDB()
			.then(() => done())
			.catch((err: any) => done(err));
	});

	afterAll((done) => {
		conn.closeDB()
			.then(() => done())
			.catch((err: any) => done(err));
	});

	it('Should create a new user', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'test@test.test',
				password: '123456',
				passwordconfirmation: '123456',
			})
			.then((res: { body: any }) => {
				const body = res.body;
				expect(body?.hasOwnProperty('_id')).toBe(true);
				expect(body?.hasOwnProperty('colectionId')).toBe(true);
				expect(body?.hasOwnProperty('availableIngredientsId')).toBe(
					true
				);
				expect(body?.hasOwnProperty('email')).toBe(true);
				expect(body?.hasOwnProperty('createdAt')).toBe(true);
				expect(body?.hasOwnProperty('updatedAt')).toBe(true);
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
				expect(res.body).not.toContain('_id');
				expect(res.text).toBe('User already exists');
				expect(res.status).toBe(409);
				done();
			})
			.catch((err) => done(err));
	});
});
