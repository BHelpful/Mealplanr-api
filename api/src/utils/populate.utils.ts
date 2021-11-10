// TODO: change type any to mongoose schema type.
export function getRefrences(mongooseSchema: any): string[] {
	let refs: string[] = [];

	// Find all refrence names from schema

	return refs;
}

export function pupulateModelResponse(model: any, modelRefrences: string[]) {
	// TODO: make this correct.
	modelRefrences.forEach((ref) => {
		model.populate(ref);
	});

	return model;
}
