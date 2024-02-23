const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
// require('dotenv').config()

const HttpError = require('../models/error.model')
const User = require('../models/user.model')
const Otp = require('../models/otp.model')




const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body
        if(!name || !email || !password || !password2) {
            return next(new HttpError("Fill all the required fields", 400))
        }

        const newEmail = email.toLowerCase()
        const emailExits = await User.findOne({email: newEmail})

        if(emailExits) {
            return next(new HttpError("Email already exists", 400))
        }
        
        if((password.trim()).length < 8) {
            return next(new HttpError("Password should be atleast 8 characters", 400))
        }
        
        if(password != password2) {
            return next(new HttpError("Passwords do not match", 400))
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            name: name,
            email: newEmail,
            password: hashPassword
        })

        return res.status(200).json({message: "User registered successfully"})

    } catch (error) {
        console.log(error)
        return next(new HttpError("User registration failed!", 400))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return next(new HttpError("Fill all the required fields", 400))
        }
        
        const newEmail = email.toLowerCase()
        
        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(new HttpError("Invalid credentials", 404))
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) {
            return next(new HttpError("Invalid credentials", 404))
        }

        const {_id: id, name: name} = user
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: '1d'})
        return res.status(200).json({token: token, id: id, name: name})

    } catch (error) {
        console.log(error)
        return next(new HttpError("User login failed!", 400))
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(new HttpError("Please login", 404))
        }
        // console.log(user)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return next(new HttpError(error))
    }
}

const editName = async(req, res, next) => {
    try {
        // console.log(req.body)
        const {name, currentPassword} = req.body
        if(!name || !currentPassword) {
            return next(new HttpError("Fill all the required fields", 422))
        }

        const user = await User.findById(req.user.id)
        if(!user) {
            return next(new HttpError("User not found", 404))
        }

        const validatePassword = await bcrypt.compare(currentPassword, user.password)
        if(!validatePassword) {
            return next(new HttpError("Incorrect password", 402))
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: name,
        }, {new: true})

        return res.status(200).json({message: "User updated succesfully"})

    } catch (error) {
        return next(new HttpError(error))
    }
}

const editPassword = async(req, res, next) => {
    try {
        const {currentPassword, newPassword, confirmNewPassword} = req.body
        if(!currentPassword || !newPassword || !confirmNewPassword) {
            return next(new HttpError("Fill all the required fields", 422))
        }

        const user = await User.findById(req.user.id)
        if(!user) {
            return next(new HttpError("User not found", 404))
        }

        const validatePassword = await bcrypt.compare(currentPassword, user.password)
        if(!validatePassword) {
            return next(new HttpError("Incorrect password", 402))
        }

        if(newPassword !== confirmNewPassword) {
            return next(new HttpError("Both the passwords don't match"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            password: hashPassword
        }, {new: true})

        return res.status(200).json(updatedUser)

    } catch (error) {
        return next(new HttpError(error))
    }
}

const sendOtp = async (req, res, next) => {
    try {
        const { email }= req.body
        const emailExists = await User.findOne({email: email})
        if(emailExists) {
            const otp = Math.floor(Math.random() * 999999)
            var transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.APP_PASSWORD
                }
            });

            const info = await transport.sendMail({
                from: {
                    name: "Blogify Admin",
                    address: process.env.USER_EMAIL
                }, // sender address
                to: email, // list of receivers
                subject: "OTP for Blogify password reset", // Subject line
                html: ` <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 50px;">
                            <div style="max-width: 400px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                                <h2 style="color: #333;">This OTP will be valid only for 5 minutes</h2>
                                <p style="color: #555; margin-bottom: 20px;">Your OTP is:</p>
                                <div style="font-size: 24px; font-weight: bold; color: #007bff; margin-bottom: 20px;">
                                    ${otp}
                                </div>
                            </div>
                        </body>
                `
            });

            if(info.messageId) {
                const otpData = await Otp.create({
                    email: email,
                    otp: otp
                })
                return res.status(200).json({Message: "OTP sent successfully!"})

            }
        }

        return next(new HttpError("No such user found"))
    } catch (error) {
        console.log(error)
        return next(new HttpError(error))
    }
}

const changePassword = async (req, res, next) => {
    try {
        const {email, password, confirmPassword, otp} = req.body
        if(!email || !password || !confirmPassword || !otp) {
            return next(new HttpError("Fill all the required fields"))
        }

        if(password !== confirmPassword) {
            return next(new HttpError("Both the passwords don't match"))
        }

        const findOtp = await Otp.findOne({email: email})
        // console.log(findOtp)

        if(findOtp.otp != otp) {
            return next(new HttpError("Incorrect OTP"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const updatePassword = await User.findOneAndUpdate({email: email}, {
            password: hashPassword
        }, {new: true})

        const deleteOtp = await Otp.findOneAndDelete({email: email})

        return res.status(200).json({message: "Password updated"})
        
    } catch (error) {
        console.log(error)
        return next(new HttpError(error))
    }
}


module.exports ={ registerUser, loginUser, getUser, editName, editPassword, sendOtp, changePassword }