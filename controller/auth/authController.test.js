const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/connection');

beforeEach(async () => {
    await pool.query('START TRANSACTION');
});

afterEach(async () => {
    await pool.query('ROLLBACK');
});

afterAll(async () => {
    await pool.end();
});

describe('checking auth controller', () => {
    describe('when all credentials are given', () => {
        test('should respond with status code 201 for successful sign-up', async () => {
            const response = await request(app).post('/api/v1/auth/sign-up').send({
                username: 'username',
                email: 'khhudyydi@gmail.com',
                password: 'password'
            });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('User successfully created');
        });

        test('should validate email format', async () => {
            const response = await request(app).post('/api/v1/auth/sign-up').send({
                username: 'username',
                email: 'com',
                password: 'password'
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Invalid email format');
        });

        test('should respond with status 409 if the user already exists', async () => {
            const createUserQuery = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;
            await pool.query(createUserQuery, ['userone', 'admin@gmail.com', 'bchjb']);

            const response = await request(app).post('/api/v1/auth/sign-up').send({
                email: 'admin@gmail.com',
                username: 'testuser',
                password: 'testpassword'
            });

            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe('User already exists with this email');
        });
    });

    describe('when not all credentials are provided', () => {
        test('should respond with status code 400', async () => {
            const reqBody = [
                { username: 'username' },
                { email: 'bibekmagar746@gmail.com' },
                { password: 'password' },
                {}
            ];
            for (const body of reqBody) {
                const response = await request(app).post('/api/v1/auth/sign-up').send(body);
                expect(response.statusCode).toBe(400); // Bad Request
                expect(response.body.message).toBe('Email, username, and password are required');
            }
        });
    });
});
