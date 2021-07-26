import { Router } from 'express';
import { omit } from 'lodash';
import { createUserHandler } from '../collections/user/user.controller';
import { userSM } from '../collections/user/user.model';
import {
	createUserSchema,
	userPostStructure,
} from '../collections/user/user.schema';
import { validateRequest } from '../middleware';

const router = Router();

export const usersPost = {
	post: {
		summary: 'Register user',
		description:
			'Register user (validating the body of the request before calling the method to create a new user)',
		tags: ['users'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create user body object',
				required: true,
				schema: {
					type: 'object',
					properties: userPostStructure,
				},
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: omit(userSM, 'password'),
			},
			'409': {
				description: 'Conflict error - user already exists',
			},
		},
	},
};
// Create a new user
router.post('/', validateRequest(createUserSchema), createUserHandler);

export default router;
