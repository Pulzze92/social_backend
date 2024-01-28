import PostModel from '../models/Post.js';

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
