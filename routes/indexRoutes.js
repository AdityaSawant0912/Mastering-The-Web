const express = require('express');
const path = require('path')
const indexController = require('../controllers/indexController');

const router = express.Router();
router
    .route("")
    .get(indexController.getIndex)

router.use(express.static(path.join(__dirname, 'public')))

module.exports = router;