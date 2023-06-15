const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "648889f4f788dce662e4ee39"
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token)

const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {id} = jwt.verify(token, SECRET_KEY);
    // console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg4OWY0Zjc4OGRjZTY2MmU0ZWUzOSIsImlhdCI6MTY4NjY3MDM4NSwiZXhwIjoxNjg2NzUzMTg1fQ.BOHw7FI8CFXPbjmZogyPP8cQz0q25k8EXtxbaBats4S";
    jwt.verify(invalidToken, SECRET_KEY);
}
catch(error) {
    console.log(error.message)
}