import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import Recipe, { RecipeDocument } from './recipe.model';

export function createRecipe(input: DocumentDefinition<RecipeDocument>) {
	return Recipe.create(input);
}

export function findRecipe(
	query: FilterQuery<RecipeDocument>,
	options: QueryOptions = { lean: true }
) {
	return Recipe.findOne(query, {}, options);
}

export function findAndUpdateRecipe(
	query: FilterQuery<RecipeDocument>,
	update: UpdateQuery<RecipeDocument>,
	options: QueryOptions
) {
	return Recipe.findOneAndUpdate(query, update, options);
}

export function deleteRecipe(query: FilterQuery<RecipeDocument>) {
	return Recipe.deleteOne(query);
}
