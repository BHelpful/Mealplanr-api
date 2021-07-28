import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import recipeModel, { RecipeDocument } from './recipe.model';

/**
 * This function will create a new recipe for a user and return the recipe
 *
 * @param body - The body of the recipe (based on the recipeModel)
 * @returns a recipe document
 */
export function createRecipe(body: DocumentDefinition<RecipeDocument>) {
	return recipeModel.create(body);
}

/**
 * This function will find a recipe and return it
 *
 * @param query - a query object that will be used to find a recipe from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a recipe document
 */
export function findRecipe(
	query: FilterQuery<RecipeDocument>,
	options: QueryOptions = { lean: true }
) {
	return recipeModel.findOne(query, {}, options);
}

/**
 * This function will find, update and return a recipe
 *
 * @param query - a query object that will be used to find a recipe from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a recipe document
 */
export function findAndUpdateRecipe(
	query: FilterQuery<RecipeDocument>,
	update: UpdateQuery<RecipeDocument>,
	options: QueryOptions
) {
	return recipeModel.findOneAndUpdate(query, update, options);
}

/**
 * This function will find and delete a recipe
 *
 * @param query - a query object that will be used to find a recipe from the DB
 * @returns a recipe document
 */
export function deleteRecipe(query: FilterQuery<RecipeDocument>) {
	return recipeModel.deleteOne(query);
}
