import { Router } from 'express';
import { omit } from 'lodash';
import {
	createUserHandler,
	deleteUserHandler,
	getUserHandler,
	updateUserHandler,
} from '../collections/user/user.controller';
import { userSM } from '../collections/user/user.model';
import {
	createUserSchema,
	deleteUserSchema,
	getUserSchema,
	updateUserSchema,
	userCreateeStructure,
} from '../collections/user/user.schema';
import { requiresUser, validateRequest } from '../middleware';

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
					properties: userCreateeStructure,
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
			'400': {
				description: 'Bad Request',
			},
		},
	},
};
// Create a new user
router.post('/', validateRequest(createUserSchema), createUserHandler);

export const usersGet = {
	get: {
		summary: 'Get a user',
		description: "Get a user based on the user's mail",
		tags: ['users'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'userMail',
				in: 'path',
				description: 'Email of the user',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: omit(userSM, 'password'),
			},
		},
	},
};
// Get a user
router.get('/:userMail', validateRequest(getUserSchema), getUserHandler);

export const usersPut = {
	put: {
		summary: 'Update a user',
		description: "Update a user based on the user's mail",
		tags: ['users'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'userMail',
				in: 'path',
				description: 'Email of the user',
				required: true,
				type: 'string',
			},
			{
				name: 'body',
				in: 'body',
				description: 'Update user body object',
				required: true,
				schema: {
					type: 'object',
					properties: userCreateeStructure,
				},
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: omit(userSM, 'password'),
			},
		},
	},
};
// Update a user
router.put(
	'/:userMail',
	[requiresUser, validateRequest(updateUserSchema)],
	updateUserHandler
);

export const usersDelete = {
	delete: {
		summary: 'Delete a user',
		description: "Delete a user based on the user's mail",
		tags: ['users'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'userMail',
				in: 'path',
				description: 'Email of the user',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
			},
		},
	},
};
// Delete a user
router.delete(
	'/:userMail',
	[requiresUser, validateRequest(deleteUserSchema)],
	deleteUserHandler
);

export default router;
