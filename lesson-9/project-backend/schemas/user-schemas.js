const Joi = require("joi");

const {emailRegexp} = require("../constants/users");

const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    userSignupSchema,
    userSigninSchema,
}