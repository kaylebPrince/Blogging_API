const request = require('supertest');
const connect = require('./database');
const UserModel = require('../Models/UserModel.js');
const app = require('../app');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async()=>{
        conn = await connect();
    })

    afterEach(async()=>{
        await conn.cleanup();
    })

    afterAll(async()=>{
        await conn.disconnect();
    })

    it("should signup a user", async () =>{
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({
            email: 'ibifiriagarah@gmail.com',
            password: 'Ibifiri123',
            firstName: 'Ibifiri',
            lastName: 'Agarah'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', 'ibifiriagarah@gmail.com')
        expect(response.body.user).toHaveProperty('firstName', 'Ibifiri')
        expect(response.body.user).toHaveProperty('lastName', 'Agarah')
    })


    it('should login a user', async()=>{
        const user = await UserModel.create({email: 'ibifiriagarah@gmail.com', password: 'Ibifiri123'});

        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'ibifiriagarah@gmail.com',
            password: 'Ibifiri123'
        });


        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    })
})