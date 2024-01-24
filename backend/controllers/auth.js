const { StatusCodes } = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors/')
const User = require('../models/User');

const signUp =async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await User.create(newUser)
    res.status(StatusCodes.CREATED).json({user: {userId: user._id, email: user.email} ,token: user.createJWT() })
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Please provide valid email and password");
    const user = await User.findOne({ email })
    if (!user) throw new BadRequestError('Please provide valid email and password')
    const isValid = await user.comparePassword(password)
    if (!isValid) throw new BadRequestError('Please provide valid email and password')
    res.status(StatusCodes.OK).json({user: {userId: user._id, email: user.email} ,token: user.createJWT() })
}


module.exports = {signIn, signUp};