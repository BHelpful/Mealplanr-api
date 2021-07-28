import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import recipeModel, { RecipeDocument } from './recipe.model';

export function createRecipe(input: DocumentDefinition<RecipeDocument>) {
	return recipeModel.create(input);
}

export function findRecipe(
	query: FilterQuery<RecipeDocument>,
	options: QueryOptions = { lean: true }
) {
	return recipeModel.findOne(query, {}, options);
}

export function findAndUpdateRecipe(
	query: FilterQuery<RecipeDocument>,
	update: UpdateQuery<RecipeDocument>,
	options: QueryOptions
) {
	return recipeModel.findOneAndUpdate(query, update, options);
}

export function deleteRecipe(query: FilterQuery<RecipeDocument>) {
	return recipeModel.deleteOne(query);
}
