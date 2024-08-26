const express = require('express');
const router = express.Router();

const {contactUsform} = require('../controllers/ContactUs');

router.post("/contact-us", contactUsform);

module.exports = router;