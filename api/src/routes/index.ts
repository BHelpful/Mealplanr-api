import { omit } from 'lodash';

// TODO: find a way to generically include session and user here, as they have a slightly different structure than the other routes
// TODO: find a clever way to omit the _id field from the input model when it is a nested object like e.g. 'recipes.ingredients[]._id'

export type crudMethods = 'get' | 'post' | 'put' | 'delete';

export type swaggerObjectType = {
	CRUD: crudMethods;
	item: string;
	tag: string;
	summary: string;
	description: string;
	model: any;
	OmitInputAttributes: string[];
	OmitResponseAttributes: string[];
	invalidResponses: any;
	requiresQueryId: boolean;
	requiresBody: boolean;
	requiresUser: boolean;
	respondWithObject: boolean;
};

export function getSwaggerObject(param: swaggerObjectType) {
	let obj: any = { crud: {} };
	obj.crud = {
		...{
			summary: param.summary,
			description: param.description,
			tags: [param.tag],
			produces: ['application/json'],
			parameters: [],
			responses: {
				'200': {
					description: 'OK',
				},
				...param.invalidResponses,
			},
		},
	};

	if (param.respondWithObject) {
		param.OmitResponseAttributes.forEach((part, index, theArray) => {
			theArray[index] = `properties.${part}`;
		});
		obj.crud.responses['200'].schema = omit(
			param.model,
			param.OmitResponseAttributes
		);
	}

	if (param.requiresQueryId) {
		obj.crud.parameters.push({
			name: `${param.item}Id`,
			in: 'query',
			description: `Id of the ${param.item}`,
			required: true,
			type: 'string',
		});
	}

	if (param.requiresBody) {
		param.OmitInputAttributes.push('_id');
		param.OmitInputAttributes.forEach((part, index, theArray) => {
			theArray[index] = `properties.${part}`;
		});
		obj.crud.parameters.push({
			name: 'body',
			in: 'body',
			description: `Create ${param.item} body object`,
			required: true,
			schema: omit(param.model, param.OmitInputAttributes),
		});
	}

	if (param.requiresUser) {
		obj.crud.parameters.push(
			{
				in: 'header',
				name: 'x-refresh',
				description: 'refreshToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
			{
				in: 'header',
				name: 'authorization',
				description: 'accessToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			}
		);
	}

	switch (param.CRUD) {
		case 'get':
			obj.get = obj.crud;
			break;
		case 'put':
			obj.put = obj.crud;
			break;
		case 'post':
			obj.post = obj.crud;
			break;
		case 'delete':
			obj.delete = obj.crud;
			break;
	}

	delete obj.crud;
	return obj;
}
