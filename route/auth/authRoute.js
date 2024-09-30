const express = require('express')
const { userSignUP } = require('../../controller/auth/authController')
const router = express.Router()

router.route('/sign-up').post(userSignUP)

module.exports = router




