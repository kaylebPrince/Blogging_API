const request = require('supertest');
const { connect } = require('./database')
const app = require('../app')
const moment = require('moment')
const blogModel = require('../Models/blogModel')
const userModel = require('../Models/UserModel');

describe('Order Route', () => {
    let conn;
    let token;

    beforeAll(async ()=>{
        conn = await connect()
        
        await userModel.create({email: 'ibifiriagarah@gmail.com', password: 'Ibifiri123'})

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'ibifiriagarah@gmail.com',
            password: 'Ibifiri123'
        });
        token = loginResponse.body.token;
    })

    afterEach(async ()=>{
        await conn.cleanup()
    })

    afterAll(async ()=>{
        await conn.disconnect()
    })

    it('should return blogs', async()=>{
        await blogModel.create({
            state: "published",
            title: "Letter of Recommendation: Get a Vasectomy",
            description: "Men in the US typically do not talk about or worry about birth control that much, to the detriment of the health and safety of women.",
            body: "In the spirit of trying to change that a little, I’m going to talk to you about my experience. About a decade ago, knowing that I did not want to have any more children, I had a vasectomy. And let me tell you, it’s been great. Quickly, here’s what a vasectomy is, via the Mayo Clinic: Vasectomy is a form of male birth control that cuts the supply of sperm to your semen. It’s done by cutting and sealing the tubes that carry sperm. Vasectomy has a low risk of problems and can usually be performed in an outpatient setting under local anesthesia.",
            tags: ["Medicine", "Vasectomy"]
        })

        const response = await request(app)
        .get('/blogs?state=published')
        .set('content-type', 'application/json')
        .set('Authorization', `jwt ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogPosts')
        expect(reaponse.body).toHaveProperty('status', true)
    })
});