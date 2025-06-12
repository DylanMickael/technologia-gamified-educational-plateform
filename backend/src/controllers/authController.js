const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '7d';

// === Inscription ===
exports.signup = async (req, res) => {
  try {
    const { email, password, nom, prenom, role } = req.body;

    console.log('[SIGNUP] Données reçues :', email);

    // Vérifie si l'utilisateur existe déjà
    const { data: existing, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) return res.status(400).json({ error: 'Email déjà utilisé' });

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('[SIGNUP] Mot de passe haché');

    const { data, error } = await supabase
      .from('users')
      .insert([{
        email,
        password_hash,
        nom,
        prenom,
        role: role || 'agent'
      }])
      .select();

    if (error) throw error;

    console.log('[SIGNUP] Utilisateur créé :', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[SIGNUP] Erreur :', err.message);
    res.status(400).json({ error: err.message });
  }
};

// === Connexion ===
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[LOGIN] Tentative :', email);

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log('[LOGIN] Authentification réussie. Token généré.');

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Connexion réussie', user: {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role
    }});
  } catch (err) {
    console.error('[LOGIN] Erreur :', err.message);
    res.status(400).json({ error: err.message });
  }
};

// === Déconnexion ===
exports.logout = (req, res) => {
  res.clearCookie('token');
  console.log('[LOGOUT] Déconnexion');
  res.json({ message: 'Déconnexion réussie' });
};
