import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidator } from './validations/auth.js';
import { loginValidator } from './validations/login.js';
import { handleValidationErrors } from './handleValidationErrors.js';

import checkAuth from './utils/checkAuth.js';

import { postCreateValidator } from './validations/post.js';

import {
	register,
	login,
	getUserInfo,
	getAllPosts,
	getOnePost,
	createPost,
	removePost,
	updatePost,
} from './controllers/index.js';

mongoose
	.connect(
		'mongodb+srv://admin:6iSVmziwD7NMXAg@cluster0.wxgj0mi.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB is OK'))
	.catch(err => console.log('DB ERROR', err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidator, handleValidationErrors, register);
app.post('/auth/login', loginValidator, handleValidationErrors, login);
app.get('/auth/aboutme', checkAuth, getUserInfo);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get('/posts', getAllPosts);
app.get('/posts/:id', postCreateValidator, getOnePost);
app.post(
	'/posts',
	checkAuth,
	postCreateValidator,
	handleValidationErrors,
	createPost
);
app.delete('/posts/:id', checkAuth, postCreateValidator, removePost);
app.patch(
	'/posts/:id',
	checkAuth,
	postCreateValidator,
	handleValidationErrors,
	updatePost
);

app.listen(4444, err => {
	if (err) {
		throw new Error(err);
	}

	console.log('Server OK');
});
