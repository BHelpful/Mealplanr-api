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
export async function createStore(body: DocumentDefinition<StoreDocument>) {
	try {
		return await storeModel.create(body);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find a store and return it
 *
 * @param query - a query object that will be used to find a store from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a store document
 */
export async function findStore(
	query: FilterQuery<StoreDocument>,
	options: QueryOptions = { lean: true }
) {
	try {
		return await storeModel.findOne(query, {}, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find, update and return a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a store document
 */
export async function findAndUpdateStore(
	query: FilterQuery<StoreDocument>,
	update: UpdateQuery<StoreDocument>,
	options: QueryOptions
) {
	try {
		return await storeModel.updateOne(query, { $set: update }, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @returns a store document
 */
export async function deleteStore(query: FilterQuery<StoreDocument>) {
	try {
		return await storeModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
