import { Schema, Document, Model, SchemaType } from 'mongoose';
import log from '../logger';

// TODO: add correct type to param
export function getReferences(mongooseSchema: any): string[] {
	let refs: string[] = [];

	for (const key in mongooseSchema.paths) {
		const path = mongooseSchema.paths[key];

		// find sub-documents
		if (path.schema) {
			refs = refs.concat(getReferences(path.schema));
		}

		if (path?.options.ref) {
			refs.push(path?.options.ref);
		}
	}
	return refs;
}

export function populateModelResponse(model: any, modelReferences: string[]) {
	// TODO: make this correct. Could use this (https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose)
	modelReferences.forEach((ref) => {
		model.populate(ref);
	});

	return model;
}
