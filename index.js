import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
    .connect('mongodb+srv://admin:6iSVmziwD7NMXAg@cluster0.wxgj0mi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB is OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('111 111 Hello World!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Vasya',
    }, 'secret123');

    res.json({
        success: true,
        token,
    })
});

app.listen(4444, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log('Server OK');
});
