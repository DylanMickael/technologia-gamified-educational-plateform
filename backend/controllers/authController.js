const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { User } = require('../models');

const signup = async (req, res) => {
    const { email, password, nom, prenom, role, adresse, telephone, photo_profil } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

        // Hasher le mot de passe
        const password_hash = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = await User.create({
            email,
            password_hash,
            nom,
            prenom,
            role,
            adresse,
            telephone,
            photo_profil
        });

        // Générer un token JWT
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '1h'
        });

        // Envoyer le token dans un cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // mettre true en prod avec HTTPS
            maxAge: 3600000
        });

        // Réponse
        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: newUser.id,
                email: newUser.email,
                nom: newUser.nom,
                prenom: newUser.prenom,
                role: newUser.role,
                token: token,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du compte' });
    }
};

module.exports = { signup };
