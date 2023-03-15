import request from 'supertest'
import { app, server } from '../src/app';

describe('GET /hello', () => {
    test('should return "Hello, World!"', async () => {
        const response = await request(app).get('/hello');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });
});

describe('POST /expenses', () => {
    test('should return "Invalid parameters"', async () => {
        const response = await request(app)
            .post('/payouts')
            .set('Accept', 'application/json');

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid parameters");
    });

    test('Check with 2 people', async () => {
        const params = {
            "expenses": [
                { "name": "Adriana", "amount": 5.75 },
                { "name": "Adriana", "amount": 5.75 },
                { "name": "Bao", "amount": 12 }
            ]
        };

        const response = await request(app)
            .post('/payouts')
            .send(params)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "total": 23.5,
            "equalShare": 11.75,
            "payouts": [
                {
                    "owes": "Adriana",
                    "owed": "Bao",
                    "amount": 0.25
                }
            ]
        });
    });

    test('Check with 3 people', async () => {
        const params = {
            "expenses": [
                { "name": "Adriana", "amount": 5.75 },
                { "name": "Laura", "amount": 4.75 },
                { "name": "Bao", "amount": 12 }
            ]
        };

        const response = await request(app)
            .post('/payouts')
            .send(params)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "total": 22.5,
            "equalShare": 7.5,
            "payouts": [
                {
                    "owes": "Adriana",
                    "owed": "Bao",
                    "amount": 1.75
                }, {
                    "owes": "Laura",
                    "owed": "Bao",
                    "amount": 2.75
                }
            ]
        });
    });
});

afterAll((done) => {
    server.close(done);
});