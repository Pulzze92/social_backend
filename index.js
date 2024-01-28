import express from 'express';
import mongoose from 'mongoose';

import { registerValidator } from './validations/auth.js';
import { loginValidator } from './validations/login.js';

import checkAuth from './utils/checkAuth.js';

import { register, login, getUserInfo } from './controllers/UserController.js';

import { createPost } from './controllers/PostController.js';
import { postCreateValidator } from './validations/post.js';

mongoose
	.connect(
		'mongodb+srv://admin:6iSVmziwD7NMXAg@cluster0.wxgj0mi.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB is OK'))
	.catch(err => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, register);
app.post('/auth/login', loginValidator, login);
app.get('/auth/aboutme', checkAuth, getUserInfo);

app.get('/posts', postCreateValidator, createPost);

app.listen(4444, err => {
	if (err) {
		throw new Error(err);
	}

	console.log('Server OK');
});
