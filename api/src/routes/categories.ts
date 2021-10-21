import { Router } from 'express';
import { omit } from 'lodash';
import { getSwaggerObject } from '.';
import {
	createCategoryHandler,
	deleteCategoryHandler,
	getCategoryHandler,
	updateCategoryHandler,
} from '../collections/category/category.controller';
import { categorySM } from '../collections/category/category.model';
import {
	createCategorySchema,
	deleteCategorySchema,
	getCategorySchema,
	updateCategorySchema,
} from '../collections/category/category.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new category
router.post(
	'/',
	[requiresUser, validateRequest(createCategorySchema)],
	createCategoryHandler
);
export const categoriesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'category',
		tag: 'categories',
		summary: 'Create new category',
		description:
			'Creates a new category to be used in settings and for mealplans and shoppinglist',
		model: categorySM,
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

// Update a category
router.put(
	'/',
	[requiresUser, validateRequest(updateCategorySchema)],
	updateCategoryHandler
);
export const categoriesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'category',
		tag: 'categories',
		summary: 'Update category',
		description: 'Updates a category that is globally available',
		model: categorySM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the category',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such category exists',
			},
		},
		requiresQueryId: true,
		requiresBody: true,
		requiresUser: true,
		respondWithObject: true,
	}),
};

// Get a category
router.get('/', [validateRequest(getCategorySchema)], getCategoryHandler);
export const categoriesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'category',
		tag: 'categories',
		summary: 'Get a category',
		description: 'Get a category based on the categoryId',
		model: categorySM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {},
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: false,
		respondWithObject: true,
	}),
};

// Delete a category
router.delete(
	'/',
	[requiresUser, validateRequest(deleteCategorySchema)],
	deleteCategoryHandler
);
export const categoriesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'category',
		tag: 'categories',
		summary: 'Delete a category',
		description: 'Delete a category based on the categoryId',
		model: categorySM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the category',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such category exists',
			},
		},
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: true,
		respondWithObject: false,
	}),
};

export default router;
