import { Router } from 'express';
import { getSwaggerObject, swaggerObjectType } from '.';
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

const ingredientsPostInput: swaggerObjectType = {
	CRUD: 'post',
	tag: 'ingredients',
	item: 'ingredient',
	summary: 'Create new ingredient',
	description:
		'Creates a new ingredient to be used in settings and for mealplans and shoppinglist',
	model: ingredientSM,
	requiresId: false,
	requiresBody: true,
	requiresUser: true,
	respondWithObject: true,
	itemsIntpuOmit: ['properties._id'],
	itemsResponseOmit: [],
	invalidRequestObject: {
		'400': {
			description: 'Bad Request',
		},
		'403': {
			description: 'User not logged in',
		},
	},
};
export const ingredientsPost = { ...getSwaggerObject(ingredientsPostInput) };
// Create a new ingredient
router.post(
	'/',
	[requiresUser, validateRequest(createIngredientSchema)],
	createIngredientHandler
);

const ingredientsPutInput: swaggerObjectType = {
	CRUD: 'put',
	tag: 'ingredients',
	item: 'ingredient',
	summary: 'Update ingredient',
	description: 'Updates a ingredient that is globally available',
	model: ingredientSM,
	requiresId: true,
	requiresBody: true,
	requiresUser: true,
	respondWithObject: true,
	itemsIntpuOmit: ['properties._id'],
	itemsResponseOmit: [],
	invalidRequestObject: {
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
};
export const ingredientsPut = { ...getSwaggerObject(ingredientsPutInput) };
// Update a ingredient
router.put(
	'/',
	[requiresUser, validateRequest(updateIngredientSchema)],
	updateIngredientHandler
);

const ingredientsGetInput: swaggerObjectType = {
	CRUD: 'get',
	tag: 'ingredients',
	item: 'ingredient',
	summary: 'Get a ingredient',
	description: 'Get a ingredient based on the ingredientId',
	model: ingredientSM,
	requiresId: true,
	requiresBody: false,
	requiresUser: false,
	respondWithObject: true,
	itemsIntpuOmit: ['properties._id'],
	itemsResponseOmit: [],
	invalidRequestObject: {},
};
export const ingredientsGet = { ...getSwaggerObject(ingredientsGetInput) };

// Get a ingredient
router.get(
	'/',
	[validateRequest(getIngredientSchema)],
	getIngredientHandler
);

const ingredientsDeleteInput: swaggerObjectType = {
	CRUD: 'delete',
	tag: 'ingredients',
	item: 'ingredient',
	summary: 'Delete a ingredient',
	description: 'Delete a ingredient based on the ingredientId',
	model: ingredientSM,
	requiresId: true,
	requiresBody: false,
	requiresUser: true,
	respondWithObject: false,
	itemsIntpuOmit: [],
	itemsResponseOmit: [],
	invalidRequestObject: {
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
};
export const ingredientsDelete = {
	...getSwaggerObject(ingredientsDeleteInput),
};
// Delete a ingredient
router.delete(
	'/',
	[requiresUser, validateRequest(deleteIngredientSchema)],
	deleteIngredientHandler
);

export default router;
