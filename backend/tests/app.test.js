const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working' });
});

describe('GET /', () => {
    it('should return 200 and message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'API is working');
    });
});
