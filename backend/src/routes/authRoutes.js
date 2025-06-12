const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log('=== AUTH ROUTES DEBUG ===');
console.log('Router type:', typeof router);

// Routes d'authentification
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Dans votre fichier de routes d'authentification
router.get('/check', async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Not authenticated' });
  
      const decoded = jwt.verify(token, JWT_SECRET);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, nom, prenom, role')
        .eq('id', decoded.id)
        .maybeSingle();
  
      if (error || !user) throw new Error('User not found');
  
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

console.log('Exporting router, type:', typeof router);
module.exports = router;
