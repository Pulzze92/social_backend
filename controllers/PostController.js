import PostModel from '../models/Post.js';

export const getAllPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec();

		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to retrieve posts',
		});
	}
};

export const getOnePost = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			}
		).then(doc => {
			if (!doc) {
				return res.status(404).json({
					message: 'Post is not found',
				});
			}

			res.json(doc);
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: `Failed to retrieve post`,
		});
	}
};

export const createPost = async (req, res) => {
	try {
		const document = new PostModel({
			title: req.body.title,
			body: req.body.body,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});

		const post = await document.save();

		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Unsuccessful creation of post',
		});
	}
};

export const removePost = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndDelete({
			_id: postId,
		}).then(post => {
			if (!post) {
				return res.status(404).json({
					message: 'Post is not found',
				});
			}

			res.json({
				success: true,
			});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: `Failed to delete post`,
		});
	}
};

export const updatePost = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				body: req.body.body,
				tags: req.body.tags,
				imageUrl: req.body.imageUrl,
				user: req.userId,
			}
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Unable to update a post',
		});
	}
};
