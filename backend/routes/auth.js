const express = require('express');
const multer = require('multer');
const router = express.Router();
const { signup, login, getProfile, authenticateToken } = require('../controllers/authController');


const upload = multer();

// ROUTES AUTH
router.post('/inscription', upload.none(), signup);
router.post('/login', upload.none(), login);

// ROUTES MILA TOKEN
router.get('/profile', authenticateToken, getProfile);

// ROUTE DECONNEXION
router.post('/logout', (req, res) => {
  // Suppression du cookie si utilisé
  res.clearCookie('token'); 
  res.status(200).json({
    message: 'Déconnexion réussie'
  });
});

module.exports = router;