import { Router } from 'express';
import { omit } from 'lodash';
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

// TODO: go over the responses of the swagger documentation and remove/add to match the what is being used for category controller

export const categoriesPost = {
	post: {
		summary: 'Create new category',
		description:
			'Creates a new category to be used in settings and for mealplans and shoppinglist',
		tags: ['categories'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create category body object',
				required: true,
				schema: omit(categorySM, ['properties._id']),
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
				schema: categorySM,
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
// Create a new category
router.post(
	'/',
	[requiresUser, validateRequest(createCategorySchema)],
	createCategoryHandler
);

export const categoriesPut = {
	put: {
		summary: 'Update category',
		description: 'Updates a category that is globally available',
		tags: ['categories'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'categoryId',
				in: 'query',
				description: 'Id of the category',
				required: true,
				type: 'string',
			},
			{
				name: 'body',
				in: 'body',
				description: 'Create category body object',
				required: true,
				schema: omit(categorySM, ['properties._id']),
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
				schema: categorySM,
			},
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
	},
};
// Update a category
router.put(
	'/',
	[requiresUser, validateRequest(updateCategorySchema)],
	updateCategoryHandler
);

export const categoriesGet = {
	get: {
		summary: 'Get a category',
		description: 'Get a category based on the categoryId',
		tags: ['categories'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'categoryId',
				in: 'query',
				description: 'Id of the category',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: categorySM,
			},
		},
	},
};
// Get a category
router.get('/', [validateRequest(getCategorySchema)], getCategoryHandler);

export const categoriesDelete = {
	delete: {
		summary: 'Delete a category',
		description: 'Delete a category based on the categoryId',
		tags: ['categories'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'categoryId',
				in: 'query',
				description: 'Id of the category',
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
				description: 'User not the creator of the category',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such category exists',
			},
		},
	},
};
// Delete a category
router.delete(
	'/',
	[requiresUser, validateRequest(deleteCategorySchema)],
	deleteCategoryHandler
);

export default router;
