import { Request, Response } from 'express';
import { get } from 'lodash';
import {
	createRecipe,
	findRecipe,
	findAndUpdateRecipe,
	deleteRecipe,
} from './recipe.service';

export async function createRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const body = req.body;

	const recipe = await createRecipe({ ...body, creatorId: userId });

	return res.send(recipe);
}

export async function updateRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const recipeId = get(req, 'params.recipeId');
	const update = req.body;

	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.sendStatus(404);
	}

	if (String(recipe.creatorId) !== userId) {
		return res.sendStatus(401);
	}

	const updatedRecipe = await findAndUpdateRecipe({ recipeId }, update, {
		new: true,
		// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
		useFindAndModify: false,
	});

	return res.send(updatedRecipe);
}
export async function getRecipeHandler(req: Request, res: Response) {
	const recipeId = get(req, 'params.recipeId');
	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.sendStatus(404);
	}

	return res.send(recipe);
}

export async function deleteRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const recipeId = get(req, 'params.recipeId');

	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.sendStatus(404);
	}

	if (String(recipe.creatorId) !== String(userId)) {
		return res.sendStatus(401);
	}

	await deleteRecipe({ recipeId });

	return res.sendStatus(200);
}
