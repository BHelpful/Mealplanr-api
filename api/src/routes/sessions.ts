import { Router } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from '../collections/session/session.controller';
import { sessionSM } from '../collections/session/session.model';
import {
	createUserSessionSchema,
	sessionPostStructure,
} from '../collections/session/session.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// login
router.post(
	'/',
	[validateRequest(createUserSessionSchema)],
	createUserSessionHandler
);
export const sessionsPost = {
	post: {
		summary: 'Log in',
		description: 'Create a new session for the user (thereby logging in)',
		tags: ['sessions'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create session body object',
				required: true,
				schema: {
					type: 'object',
					properties: sessionPostStructure,
				},
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: {
					type: 'object',
					properties: {
						accessToken: {
							type: 'string',
							example: 'JWT accessToken',
						},
						refreshToken: {
							type: 'string',
							example: 'JWT accessToken',
						},
					},
				},
			},
		},
	},
};

// Get the user's valid sessions i.e. the sessions where the user is logged in.
router.get('/', [requiresUser], getUserSessionsHandler);
export const sessionsGet = {
	get: {
		summary: 'Get all active sessions',
		description: 'Gets all the sessions that is still valid',
		tags: ['sessions'],
		produces: ['application/json'],
		parameters: [
			{
				in: 'header',
				name: 'x-refresh',
				description: 'refreshToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
			{
				in: 'header',
				name: 'authorization',
				description: 'accessToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: { type: 'array', items: sessionSM },
			},
			'403': {
				description: 'User not logged in',
			},
		},
	},
};

// logout (invalidate a user's session)
router.delete('/', [requiresUser], invalidateUserSessionHandler);
export const sessionsDelete = {
	delete: {
		summary: 'Logout',
		description:
			"Invalidate a user's session, which will in turn log the user out",
		tags: ['sessions'],
		produces: ['application/json'],
		parameters: [
			{
				in: 'header',
				name: 'x-refresh',
				description: 'refreshToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
			{
				in: 'header',
				name: 'authorization',
				description: 'accessToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
		],
		responses: {
			'200': {
				description: 'OK',
			},
			'403': {
				description: 'User not logged in',
			},
		},
	},
};

export default router;
