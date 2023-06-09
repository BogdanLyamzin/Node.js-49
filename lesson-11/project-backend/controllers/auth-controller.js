const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {nanoid} = require("nanoid");

const User = require("../models/user");

const { ctrlWrapper } = require("../decorators");

const { HttpError, sendEmail } = require("../helpers");

const {SECRET_KEY, BASE_URL} = process.env;

const signup = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, verificationCode});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}

const verify = async(req, res) => {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});
    if(!user) {
        throw 401
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401)
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "Email success"
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid")
    }

    if(!user.verify) {
        throw HttpError(401, "Email not register")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    }

    const {_id: id} = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
    })
}

const getCurrent = (req, res)=> {
    const {name, email} = req.user;

    res.json({
        name,
        email,
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}