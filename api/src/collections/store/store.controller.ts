import { Request, Response } from 'express';
import { get } from 'lodash';
import {
	createStore,
	findStore,
	findAndUpdateStore,
	deleteStore,
} from './store.service';

/**
 * This function is used to request the creation of a new store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the store.
 */
export async function createStoreHandler(req: Request, res: Response) {
	// TODO: add some sort of check, as not just anybody using the api should be able to add a store.
	const body = req.body;

	const store = await createStore({ ...body });

	return res.send(store);
}

/**
 * This function is used to request the update of a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated store.
 */
export async function updateStoreHandler(req: Request, res: Response) {
	// TODO: add some sort of check, as not just anybody using the api should be able to update a store.
	const storeId = get(req, 'query.storeId');
	const update = req.body;

	const store = await findStore({ storeId });

	if (!store) {
		return res.sendStatus(404);
	}

	const updatedStore = await findAndUpdateStore({ storeId }, update, {
		new: true,
		// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
		useFindAndModify: false,
	});

	return res.send(updatedStore);
}

/**
 * This function is used to request a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the store.
 */
export async function getStoreHandler(req: Request, res: Response) {
	const storeId = get(req, 'query.storeId');
	const store = await findStore({ storeId });

	if (!store) {
		return res.sendStatus(404);
	}

	return res.send(store);
}

/**
 * This function is used to request the deletion of a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteStoreHandler(req: Request, res: Response) {
	// TODO: add some sort of check, as not just anybody using the api should be able to delete a store.
	const storeId = get(req, 'query.storeId');

	const store = await findStore({ storeId });

	if (!store) {
		return res.sendStatus(404);
	}

	await deleteStore({ storeId });

	return res.sendStatus(200);
}
