const express = require('express');
const router = express.Router();

const {sendEmailUser} = require('../controllers/emailController')

router.post('/send-email', sendEmailUser)

module.exports = router;