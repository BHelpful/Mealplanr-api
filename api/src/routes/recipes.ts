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
	updateRecipeSchema,
} from '../collections/recipe/recipe.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

export const recipesPost = {
	post: {
		summary: 'Create new recipe',
		description: "Creates a new recipe to add to the user's collection",
		tags: ['Recipes'],
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
		},
	},
};
// Create a new post
router.post(
	'/',
	[requiresUser, validateRequest(createRecipeSchema)],
	createRecipeHandler
);

// Update a post
router.put(
	'/:recipeId',
	[requiresUser, validateRequest(updateRecipeSchema)],
	updateRecipeHandler
);

// Get a post
router.get('/:recipeId', getRecipeHandler);

// Delete a post
router.delete(
	'/:recipeId',
	[requiresUser, validateRequest(deleteRecipeSchema)],
	deleteRecipeHandler
);

export default router;
