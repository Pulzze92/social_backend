import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Unsuccessful registration',
		});
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(403).json({
				message: 'User is not found',
			});
		}

		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		if (!isValidPass) {
			return res.status(404).json({
				message: 'Username or password is incorrect',
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Authorization is insuccessful',
		});
	}
};

export const getUserInfo = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				message: 'User is not found',
			});
		}

		const { passwordHash, ...userData } = user._doc;

		res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Forbidden',
		});
	}
};
