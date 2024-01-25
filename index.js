import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator';

mongoose
    .connect('mongodb+srv://admin:6iSVmziwD7NMXAg@cluster0.wxgj0mi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB is OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true,
    })
});

app.listen(4444, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log('Server OK');
});
