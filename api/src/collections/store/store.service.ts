import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import storeModel, { StoreDocument } from './store.model';

/**
 * This function will create a new store for a user and return the store
 *
 * @param body - The body of the store (based on the storeModel)
 * @returns a store document
 */
export function createStore(body: DocumentDefinition<StoreDocument>) {
	return storeModel.create(body);
}

/**
 * This function will find a store and return it
 *
 * @param query - a query object that will be used to find a store from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a store document
 */
export function findStore(
	query: FilterQuery<StoreDocument>,
	options: QueryOptions = { lean: true }
) {
	return storeModel.findOne(query, {}, options);
}

/**
 * This function will find, update and return a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a store document
 */
export function findAndUpdateStore(
	query: FilterQuery<StoreDocument>,
	update: UpdateQuery<StoreDocument>,
	options: QueryOptions
) {
	return storeModel.findOneAndUpdate(query, update, options);
}

/**
 * This function will find and delete a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @returns a store document
 */
export function deleteStore(query: FilterQuery<StoreDocument>) {
	return storeModel.deleteOne(query);
}
