import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator';

import UserModel from './models/User.js';

import bcrypt from 'bcrypt';

mongoose
    .connect('mongodb+srv://admin:6iSVmziwD7NMXAg@cluster0.wxgj0mi.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB is OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json(user)
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unsuccessful registration'
        });
    }
});

app.listen(4444, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log('Server OK');
});
