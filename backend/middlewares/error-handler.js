const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandler;