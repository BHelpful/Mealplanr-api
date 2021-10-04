import request from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, disconnect } from 'mongoose';


import { connectDB, closeDB } from '../connect';
import log from '../logger';

let mongod: MongoMemoryServer;

describe('POST /users', () => {
	beforeAll(async () => {
		// await connectDB();
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		await connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}).catch((error) => {
			log.error('Error in connecting', error);
		});
		log.info('Mock connection success');
	});

	afterAll(async () => {
		await mongod.stop();
		await closeDB();
	});

	it('Should create a new user', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: '123456',
			passwordconfirmation: '123456',
		});

		const body = res.body;
		expect(body?.hasOwnProperty('_id')).toBe(true);
		expect(body?.hasOwnProperty('email')).toBe(true);
		expect(body?.hasOwnProperty('createdAt')).toBe(true);
		expect(body?.hasOwnProperty('updatedAt')).toBe(true);
	});

	it('Should fail as user already exists', async () => {
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
