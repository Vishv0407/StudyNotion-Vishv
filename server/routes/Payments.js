const express = require('express');
const router = express.Router();

const {capturePayments, verifySignature} = require('../controllers/Payments');
const {auth, isAdmin, isInstructor, isStudent} = require('../middlewares/Auth');

router.post("/capturePayment", auth, isStudent, capturePayments);
router.post("/verifySignature", verifySignature);

module.exports = router;