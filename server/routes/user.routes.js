const express = require('express')
const { registerUser, loginUser, getUser, editName, editPassword, sendOtp, changePassword } = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/:id', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/editName', authMiddleware, editName)
router.patch('/editPassword', authMiddleware, editPassword)
router.post('/send-otp', sendOtp)
router.post('/reset-password', changePassword)

module.exports = router