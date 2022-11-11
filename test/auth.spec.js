const request = require('supertest');
const connect = require('./database');
const UserModel = requrie('../Models/UserModel.js');
const app = require('../app');
const { describe, afterEach, it } = require('node:test');
const { application } = require('express');

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
            email: 'kaylebprince@gmail.com',
            password: 'Caleb123',
            firstName: 'Caleb',
            lastName: 'Agarah'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', 'kaylebPrince@gmail.com')
        expect(response.body.user).toHaveProperty('firstName', 'Caleb')
        expect(response.body.user).toHaveProperty('lastName', 'Agarah')
    })
})