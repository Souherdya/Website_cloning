const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Please provide an email"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        maxlength: 150,
        required: [true, "Please provide a password"]
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.methods.createJWT = function () {
    const token = jwt.sign(
        { userId: this._id, email: this.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_VALIDITY_TIME }
    )
    return token
}

UserSchema.methods.comparePassword = async function(passwd) {
    return await bcrypt.compare(passwd, this.password)
}

module.exports = mongoose.model("User", UserSchema);