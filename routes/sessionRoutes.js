const express = require('express');
const path = require('path')
const sessionController = require('../controllers/sessionController');

const router = express.Router();
router
    .route("/login")
    .get(sessionController.getLogin)
    .post(sessionController.postLogin)

router
    .route("/signup")
    .get(sessionController.getSignup)
    .post(sessionController.postSignup)
    
router
    .route("/logout")
    .get(sessionController.getLogout)

router.use(express.static(path.join(__dirname, 'public')))

module.exports = router;