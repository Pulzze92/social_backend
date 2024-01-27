import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'incorrect email format').isEmail(),
    body('password', 'password cannot be shorter than 5 symbols').isLength({ min: 5 }),
    body('fullName', 'full name must be 3 letters minimum').isLength({ min: 3}),
    body('avatarUrl', 'the link to avatar is incorrect').optional().isURL(),
];