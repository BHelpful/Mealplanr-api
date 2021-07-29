import { Router } from 'express';
import { omit } from 'lodash';
import {
	createRecipeHandler,
	deleteRecipeHandler,
	getRecipeHandler,
	updateRecipeHandler,
} from '../collections/recipe/recipe.controller';
import { recipeSM } from '../collections/recipe/recipe.model';
import {
	createRecipeSchema,
	deleteRecipeSchema,
	getRecipeSchema,
	updateRecipeSchema,
} from '../collections/recipe/recipe.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

export const recipesPost = {
	post: {
		summary: 'Create new recipe',
		description: "Creates a new recipe to add to the user's collection",
		tags: ['recipes'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'body',
				in: 'body',
				description: 'Create recipe body object',
				required: true,
				schema: omit(recipeSM, [
					'properties.rating',
					'properties.updatedAt',
					'properties.createdAt',
					'properties.ingredients.store',
					'properties.ingredients._id',
					'properties._id',
				]),
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: recipeSM,
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
// Create a new recipe
router.post(
	'/',
	[requiresUser, validateRequest(createRecipeSchema)],
	createRecipeHandler
);

export const recipesPut = {
	put: {
		summary: 'Update recipe',
		description: 'Updates a recipe that the user owns',
		tags: ['recipes'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'recipeId',
				in: 'path',
				description: 'Id of the recipe',
				required: true,
				type: 'string',
			},
			{
				name: 'body',
				in: 'body',
				description: 'Create recipe body object',
				required: true,
				schema: omit(recipeSM, [
					'properties.rating',
					'properties.updatedAt',
					'properties.createdAt',
					'properties.ingredients.store',
					'properties.ingredients._id',
					'properties._id',
				]),
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: recipeSM,
			},
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the recipe',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such recipe exists',
			},
		},
	},
};
// Update a recipe
router.put(
	'/:recipeId',
	[requiresUser, validateRequest(updateRecipeSchema)],
	updateRecipeHandler
);

export const recipesGet = {
	get: {
		summary: 'Get a recipe',
		description: 'Get a recipe based on the recipeId',
		tags: ['recipes'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'recipeId',
				in: 'path',
				description: 'Id of the recipe',
				required: true,
				type: 'string',
			},
		],
		responses: {
			'200': {
				description: 'OK',
				schema: recipeSM,
			},
		},
	},
};
// Get a recipe
router.get('/:recipeId', validateRequest(getRecipeSchema), getRecipeHandler);

export const recipesDelete = {
	delete: {
		summary: 'Delete a recipe',
		description: 'Delete a recipe based on the recipeId',
		tags: ['recipes'],
		produces: ['application/json'],
		parameters: [
			{
				name: 'recipeId',
				in: 'path',
				description: 'Id of the recipe',
				required: true,
				type: 'string',
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
				description: 'User not the creator of the recipe',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such recipe exists',
			},
		},
	},
};
// Delete a recipe
router.delete(
	'/:recipeId',
	[requiresUser, validateRequest(deleteRecipeSchema)],
	deleteRecipeHandler
);

export default router;
