import { Router } from 'express';
import { omit } from 'lodash';
import { requiresUser, validateRequest } from '../middleware';
import {createStoreSchema,updateStoreSchema,getStoreSchema,deleteStoreSchema} from './store.schema.ts';

const router = Router();

// TODO: go over the responses of the swagger documentation and remove/add to match the what is being used for store controller

export const storesPost = {
	post: {
		summary: 'Create new store',
		description: "Creates a new store to be used in settings and for mealplans and shoppinglist",
		tags: ['stores'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create store body object',
				required: true,
				schema: storeSM,
			},
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
				schema: storeSM,
			},
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
		},
	},
};
// Create a new store
router.post(
	'/',
	[requiresUser, validateRequest(createStoreSchema)],
	createStoreHandler
);

export const storesPut = {
	put: {
		summary: 'Update store',
		description: 'Updates a store that is globally available',
		tags: ['stores'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'storeId',
				in: 'query',
				description: 'Id of the store',
				required: true,
				type: 'string',
			},
			{
				name: 'body',
				in: 'body',
				description: 'Create store body object',
				required: true,
				schema: storeSM,
			},
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
				schema: storeSM,
			},
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the store',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such store exists',
			},
		},
	},
};
// Update a store
router.put(
	'/',
	[requiresUser, validateRequest(updateStoreSchema)],
	updateStoreHandler
);

export const storesGet = {
	get: {
		summary: 'Get a store',
		description: 'Get a store based on the storeId',
		tags: ['stores'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'storeId',
				in: 'query',
				description: 'Id of the store',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: storeSM,
			},
		},
	},
};
// Get a store
router.get('/', validateRequest(getStoreSchema), getStoreHandler);

export const storesDelete = {
	delete: {
		summary: 'Delete a store',
		description: 'Delete a store based on the storeId',
		tags: ['stores'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'storeId',
				in: 'query',
				description: 'Id of the store',
				required: true,
				type: 'string',
			},
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
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the store',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such store exists',
			},
		},
	},
};
// Delete a store
router.delete(
	'/',
	[requiresUser, validateRequest(deleteStoreSchema)],
	deleteStoreHandler
);

export default router;
