import request from 'supertest';
import app from '../src/app.js';
import { sequelize } from '../src/config/db.js';
import { Users } from '../src/models/Users.js';

beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Users.destroy({ where: { email: 'john@example.com' } });
    await Users.destroy({ where: { email: 'john.dup@example.com' } });
});

afterAll(async () => {
    await Users.destroy({ where: { email: 'john@example.com' } });
    await Users.destroy({ where: { email: 'john.dup@example.com' } });
    await sequelize.close();
});

describe('GET /categories', () => {
    it('should return 200 and an array of categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('image');
    });
});

describe('POST /auth/register', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/auth/register').send({
            email: 'john@example.com',
            username: 'john123',
            password: 'StrongPassword123!',
            avatar: 'https://example.com/avatar.jpg',
            phoneNumber: '0123456789',
            city: 'Strasbourg',
            contactEmail: 'contact.john@example.com'
        });

    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('message', 'Registered with success');
    expect(res.body.data.email).toBe('john@example.com');
    });

    it('should not register if email already exists', async () => {
        const res = await request(app).post('/auth/register').send({
            email: 'john@example.com',
            username: 'johnOther',
            password: 'AnotherPass123!',
            avatar: 'https://example.com/avatar2.jpg',
            phoneNumber: '0987654321',
            city: 'Colmar',
            contactEmail: 'john.dup@example.com'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});