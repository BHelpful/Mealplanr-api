import request from 'supertest';
import app from '../app';

import { connectDB, closeDB } from '../connect';

describe('POST /users', () => {
	beforeAll((done) => {
		connectDB()
			.then(() => {
				done();
			})
			.catch((err) => done(err));
	});

	afterAll((done) => {
		closeDB()
		.then(() => {
			done();
		})
		.catch((err) => done(err));
	});

	it('Should create a new user', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: '123456',
			passwordconfirmation: '123456',
		});

		const body = res.body;
		expect(body?.hasOwnProperty('_id')).toBe(true);
		expect(body?.hasOwnProperty('colectionId')).toBe(true);
		expect(body?.hasOwnProperty('availableIngredientsId')).toBe(true);
		expect(body?.hasOwnProperty('email')).toBe(true);
		expect(body?.hasOwnProperty('createdAt')).toBe(true);
		expect(body?.hasOwnProperty('updatedAt')).toBe(true);
	});

	it('Fail, user already exists', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: '123456',
			passwordconfirmation: '123456',
		});

		expect(res.body).not.toContain('_id');
		expect(res.text).toBe('User already exists');
		expect(res.status).toBe(409);
	});
});
