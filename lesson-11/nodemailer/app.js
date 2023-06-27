const nodemailer = require("nodemailer");
require("dotenv").config();

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL,
    to: "ganibe8425@dotvilla.com",
    subject: "Test email",
    html: `<p>Test email</p>`
}

transport.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))