import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createStoreHandler,
	deleteStoreHandler,
	getStoreHandler,
	updateStoreHandler,
} from '../collections/store/store.controller';
import { storeSM } from '../collections/store/store.model';
import {
	createStoreSchema,
	deleteStoreSchema,
	getStoreSchema,
	updateStoreSchema,
} from '../collections/store/store.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new store
router.post(
	'/',
	[requiresUser, validateRequest(createStoreSchema)],
	createStoreHandler
);
export const storesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'store',
		tag: 'stores',
		summary: 'Create new store',
		description:
			'Creates a new store to be used in settings and for mealplans and shoppinglist',
		model: storeSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
		},
		requiresQueryId: false,
		requiresBody: true,
		requiresUser: true,
		respondWithObject: true,
	}),
};

// Update a store
router.put(
	'/',
	[requiresUser, validateRequest(updateStoreSchema)],
	updateStoreHandler
);
export const storesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'store',
		tag: 'stores',
		summary: 'Update store',
		description: 'Updates a store that is globally available',
		model: storeSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
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
		requiresQueryId: true,
		requiresBody: true,
		requiresUser: true,
		respondWithObject: true,
	}),
};

// Get a store
router.get('/', [validateRequest(getStoreSchema)], getStoreHandler);
export const storesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'store',
		tag: 'stores',
		summary: 'Get a store',
		description: 'Get a store based on the storeId',
		model: storeSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {},
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: false,
		respondWithObject: true,
	}),
};

// Delete a store
router.delete(
	'/',
	[requiresUser, validateRequest(deleteStoreSchema)],
	deleteStoreHandler
);
export const storesDelete = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'store',
		tag: 'stores',
		summary: 'Delete a store',
		description: 'Delete a store based on the storeId',
		model: storeSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
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
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: true,
		respondWithObject: false,
	}),
};

export default router;
