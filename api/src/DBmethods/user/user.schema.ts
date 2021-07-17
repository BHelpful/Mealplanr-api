import { object, string, ref } from 'yup';

export const createUserSchema = object({
	body: object({
		Name: string().required('Name is required'),
		Password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(
				/^[a-zA-Z0-9_.-]*$/,
				'Password can only contain Latin letters.'
			),
		PasswordConfirmation: string().oneOf(
			[ref('password'), null],
			'Passwords must match'
		),
		Email: string()
			.email('Must be a valid email')
			.required('Email is required'),
	}),
});

export const createUserSessionSchema = object({
	body: object({
		Password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(
				/^[a-zA-Z0-9_.-]*$/,
				'Password can only contain Latin letters.'
			),

		Email: string()
			.email('Must be a valid email')
			.required('Email is required'),
	}),
});
