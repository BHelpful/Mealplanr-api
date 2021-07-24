import { object, string, ref } from 'yup';
// creates the validation schema i.e the schema of which the contents of the body from the request will be
// validated against. Just for your knowledge, if there are keys in the body of the request
// that is not represented in this validation schema, it will not be validated for (of course)
// but there will not be any error. So any exess keys will be ignored.

// The schema of the body of the request will is split up in order to use it for swagger documentation in routes.ts:
export const userPostStructure = {
	names: string().required('Name is required'),
	password: string()
		.required('Password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.')
		.matches(
			/^[a-zA-Z0-9_.-]*$/,
			'Password can only contain Latin letters.'
		),
	passwordConfirmation: string().oneOf(
		[ref('password'), null],
		'Passwords must match'
	),
	email: string()
		.email('Must be a valid email')
		.required('Email is required'),
};

export const createUserSchema = object({
	body: object(userPostStructure),
});
