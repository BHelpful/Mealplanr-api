import { Router } from 'express';
import { getSwaggerObject } from '.';
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
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new ingredient
router.post(
	'/',
	[requiresUser, validateRequest(createIngredientSchema)],
	createIngredientHandler
);
export const ingredientsPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Create new ingredient',
		description:
			'Creates a new ingredient to be used in settings and for mealplans and shoppinglist',
		model: ingredientSM,
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

// Update a ingredient
router.put(
	'/',
	[requiresUser, validateRequest(updateIngredientSchema)],
	updateIngredientHandler
);
export const ingredientsPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Update ingredient',
		description: 'Updates a ingredient that is globally available',
		model: ingredientSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
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
		requiresQueryId: true,
		requiresBody: true,
		requiresUser: true,
		respondWithObject: true,
	}),
};

// Get a ingredient
router.get('/', [validateRequest(getIngredientSchema)], getIngredientHandler);
export const ingredientsGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Get a ingredient',
		description: 'Get a ingredient based on the ingredientId',
		model: ingredientSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {},
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: false,
		respondWithObject: true,
	}),
};

// Delete a ingredient
router.delete(
	'/',
	[requiresUser, validateRequest(deleteIngredientSchema)],
	deleteIngredientHandler
);
export const ingredientsDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Delete a ingredient',
		description: 'Delete a ingredient based on the ingredientId',
		model: ingredientSM,
		OmitInputAttributes: [],
		OmitResponseAttributes: [],
		invalidResponses: {
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
		requiresQueryId: true,
		requiresBody: false,
		requiresUser: true,
		respondWithObject: false,
	}),
};

export default router;
