import { Router } from 'express';
import { omit } from 'lodash';
import {
	createIngredientHandler,
	deleteIngredientHandler,
	getIngredientHandler,
	updateIngredientHandler,
} from '../collections/ingredient/ingredient.controller';
import { ingredientSM } from '../collections/ingredient/ingredient.model';
import {
	createIngredientSchema,
	deleteIngredientSchema,
	getIngredientSchema,
	updateIngredientSchema,
} from '../collections/ingredient/ingredient.schema';
import { requiresUser, sanitizeQuery, validateRequest } from '../middleware';

const router = Router();

export const ingredientsPost = {
	post: {
		summary: 'Create new ingredient',
		description:
			'Creates a new ingredient to be used in settings and for mealplans and shoppinglist',
		tags: ['ingredients'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create ingredient body object',
				required: true,
				schema: omit(ingredientSM, ['properties._id']),
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
				schema: ingredientSM,
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
// Create a new ingredient
router.post(
	'/',
	[sanitizeQuery, requiresUser, validateRequest(createIngredientSchema)],
	createIngredientHandler
);

export const ingredientsPut = {
	put: {
		summary: 'Update ingredient',
		description: 'Updates a ingredient that is globally available',
		tags: ['ingredients'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'ingredientId',
				in: 'query',
				description: 'Id of the ingredient',
				required: true,
				type: 'string',
			},
			{
				name: 'body',
				in: 'body',
				description: 'Create ingredient body object',
				required: true,
				schema: omit(ingredientSM, ['properties._id']),
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
				schema: ingredientSM,
			},
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the ingredient',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such ingredient exists',
			},
		},
	},
};
// Update a ingredient
router.put(
	'/',
	[sanitizeQuery, requiresUser, validateRequest(updateIngredientSchema)],
	updateIngredientHandler
);

export const ingredientsGet = {
	get: {
		summary: 'Get a ingredient',
		description: 'Get a ingredient based on the ingredientId',
		tags: ['ingredients'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'ingredientId',
				in: 'query',
				description: 'Id of the ingredient',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: ingredientSM,
			},
		},
	},
};
// Get a ingredient
router.get(
	'/',
	[sanitizeQuery, validateRequest(getIngredientSchema)],
	getIngredientHandler
);

export const ingredientsDelete = {
	delete: {
		summary: 'Delete a ingredient',
		description: 'Delete a ingredient based on the ingredientId',
		tags: ['ingredients'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'ingredientId',
				in: 'query',
				description: 'Id of the ingredient',
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
				description: 'User not the creator of the ingredient',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such ingredient exists',
			},
		},
	},
};
// Delete a ingredient
router.delete(
	'/',
	[sanitizeQuery, requiresUser, validateRequest(deleteIngredientSchema)],
	deleteIngredientHandler
);

export default router;
