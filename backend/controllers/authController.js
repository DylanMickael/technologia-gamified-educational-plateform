// 1. authController.js - Ajout de debug et validation
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// LOGIN //
const login = async (req, res) => {
  try {
    console.log('Login attempt - req.body:', req.body);
    
    // Validation des champs requis
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Email et mot de passe requis'
      });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret_fallback',
      { expiresIn: '7d' } // Token valide 7 jours
    );

    // Réponse avec les informations utilisateur et le token
    return res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        adresse: user.adresse,
        telephone: user.telephone,
        photo_profil: user.photo_profil,
        created_at: user.created_at
      },
      token
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({
      message: 'Erreur serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Middleware d'authentification JWT
const authenticateToken = (req, res, next) => {
  // Récupération du token depuis le header Authorization ou les cookies
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const tokenFromCookie = req.cookies.token;
  
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({
      message: 'Token d\'accès requis'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Token invalide ou expiré'
      });
    }
    
    req.user = user; // Stockage des infos utilisateur dans req
    next();
  });
};

// Fonction pour récupérer le profil utilisateur
const getProfile = async (req, res) => {
  try {
    // L'ID utilisateur vient du token JWT (req.user.id)
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] } // Exclure le mot de passe
    });

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        adresse: user.adresse,
        telephone: user.telephone,
        photo_profil: user.photo_profil,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return res.status(500).json({
      message: 'Erreur serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const signup = async (req, res) => {
  try {
    // MIVERIFIER IZAY DONNEES VORAY
    console.log('req.body:', req.body);
    console.log('req.headers:', req.headers);
    
    // MIVERIFIER RAHA MISY NY REQ.BODY
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Aucune donnée reçue. Vérifiez le Content-Type et le format des données.'
      });
    }

    // Validation des données requises
    const requiredFields = ['email', 'password', 'nom', 'prenom'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Le champ ${field} est requis`,
          received_fields: Object.keys(req.body)
        });
      }
    }

    // Vérification de l'email existant
    const existingUser = await User.findOne({
      where: { email: req.body.email }
    });
        
    if (existingUser) {
      return res.status(409).json({
        message: 'Cet email est déjà utilisé'
      });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création de l'utilisateur
    const newUser = await User.create({
      email: req.body.email,
      password_hash: hashedPassword,
      nom: req.body.nom,
      prenom: req.body.prenom,
      role: req.body.role || 'user',
      adresse: req.body.adresse,
      telephone: req.body.telephone,
      photo_profil: req.body.photo_profil
    });

    // Génération du token JWT
    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role
      },
      process.env.JWT_SECRET || 'secret_fallback',
      { expiresIn: '1h' }
    );

    // Réponse formatée
    return res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        nom: newUser.nom,
        prenom: newUser.prenom,
        role: newUser.role,
        created_at: newUser.created_at
      },
      token
    });

  } catch (error) {
    console.error('Erreur complète:', error);
        
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        message: 'Erreur de validation',
        details: messages
      });
    }

    return res.status(500).json({
      message: 'Erreur serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { 
  signup, 
  login, 
  getProfile, 
  authenticateToken 
};