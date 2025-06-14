const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
// Route d'inscription
router.post('/inscription', signup);

module.exports = router;
