import { omit } from 'lodash';

export type crudMethods = 'get' | 'post' | 'put' | 'delete';

export type swaggerObjectType = {
	CRUD: crudMethods;
	tag: string;
	item: string;
	summary: string;
	description: string;
	model: any;
	requiresUser: boolean;
	itemsIntpuOmit: string[];
	itemsResponseOmit: string[];
	invalidRequestObject: any;
};

export function getSwaggerObject(param: swaggerObjectType) {
	let obj: any = { crud: {} };
	obj.crud = {
		...{
			summary: param.summary,
			description: param.description,
			tags: [param.tag],
			produces: ['application/json'],
			parameters: [
				{
					name: 'ingredientId',
					in: 'query',
					description: `Id of the ${param.item}`,
					required: true,
					type: 'string',
				},
				{
					name: 'body',
					in: 'body',
					description: `Create ${param.item} body object`,
					required: true,
					schema: omit(param.model, param.itemsIntpuOmit),
				},
			],
			responses: {
				'200': {
					description: 'OK',
					schema: omit(param.model, param.itemsResponseOmit),
				},
				...param.invalidRequestObject,
			},
		},
	};

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
