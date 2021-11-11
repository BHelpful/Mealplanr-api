import { Query } from 'mongoose';

// TODO: add correct type to param
export function getDocumentRefs(
	mongooseSchema: any,
	nestedPath: string = ''
): string[] {
	let refs: string[] = [];

	// for all fields in the schema
	for (const key in mongooseSchema.paths) {
		const path = mongooseSchema.paths[key];
		// find sub-documents
		if (path.schema) {
			refs = refs.concat(getDocumentRefs(path.schema, `${key}.`));
		}
		// find names of the keys that reference other documents
		for (const prop in path) {
			if (prop === 'options') {
				const options = path[prop];
				if (options.ref) {
					let ref = key;
					if (nestedPath !== '') {
						ref = `${nestedPath}${key}`;
					}
					refs.push(ref);
				}
			}
		}
	}
	return refs;
}

export function populateDocumentResponse(
	model: Query<any, any> | any,
	userModelRefs: string[]
) {
	userModelRefs.forEach((ref: string) => {
		if (model != null) model.populate(ref);
	});

	return model;
}
