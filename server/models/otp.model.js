const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    }
}, {timestamps: true})

otpSchema.index({createdAt: 1},{expireAfterSeconds: 300});

const Otp = mongoose.model('Otp', otpSchema)

module.exports = Otp