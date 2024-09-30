const request = require('supertest')
const app = require('./app')


beforeAll(() => {
    server = app.listen(3000);
});

afterAll(() => {
    server.close();
});

describe("POST /users", () => {
    describe('given username and password', () => {
        test('should respond with status Code 200', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.statusCode).toBe(200);
            // expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            // expect(response.body.userId).toBeDefined()

        })
        test('check whether the header type is json/not', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('should give userid', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.body.userId).toBeDefined()
        })

    })
    describe('not given username and password', () => {
        test('should respond with status Code 400', async () => {
            const bodyData = [
                { username: 'username' },
                { password: 'password' },
                {}
            ]
            for (const body of bodyData) {
                const response = await request(app).post('/users').send(body)
                expect(response.statusCode).toBe(400);
            }
        })
    })
})