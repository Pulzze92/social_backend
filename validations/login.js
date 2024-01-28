import { body } from 'express-validator';

export const loginValidator = [
	body('email', 'incorrect email format').isEmail(),
	body('password', 'password cannot be shorter than 5 symbols').isLength({
		min: 5,
	}),
];
