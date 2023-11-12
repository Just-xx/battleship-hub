const express = require('express')
const router = express.Router();

const PatternController = require('../controllers/PatternContoller')

router.get('/pattern', PatternController.generate);

module.exports = router;