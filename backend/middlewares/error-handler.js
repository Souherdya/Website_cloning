const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors')

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.name === "ValidationError") {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: err.message})
    }
    if (err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: `The ${Object.keys(err.keyPattern)} is already in use`})
    }
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandler;