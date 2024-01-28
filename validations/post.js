import { body } from 'express-validator';

export const postCreateValidator = [
	body('title', 'Incorrect length of title (minimal length is 3 letters)')
		.isLength({ min: 3 })
		.isString(),
	body('body', 'Length of post must be more than 10 letters')
		.isLength({ min: 10 })
		.isString(),
	body('tags', 'Tags must be in the array format').optional().isArray(),
	body('imageUrl', 'The link to image is incorrect').optional().isURL(),
];
