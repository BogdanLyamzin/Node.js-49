const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const User = require("../../models/user");

const {PORT, DB_HOST_TEST} = process.env;

describe("test signup route", ()=> {
    let server = null;
    beforeAll(async()=> {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST)
    })

    afterAll(()=> {
        server.close();
        mongoose.connection.close();
    })

    beforeEach(()=> {
        
    })

    afterEach(async() => {
        await User.deleteMany({});
    })

    test("test signup route with correct data", async ()=> {
        const signupData = {
            name: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const {statusCode, body} = await request(app).post("/api/auth/signup").send(signupData);

        expect(statusCode).toBe(201);
        expect(body.email).toBe(signupData.email);
        expect(body.name).toBe(signupData.name);

        const user = await User.findOne({name: signupData.name, email: signupData.email});
        // expect(user).toBeTruthy();
    })
})