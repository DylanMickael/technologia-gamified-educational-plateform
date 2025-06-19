const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  authenticateToken,
} = require("../controllers/authController");
const { User, Category } = require("../models");

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/inscription:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données manquantes ou invalides
 *       409:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/inscription", upload.none(), signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Email ou mot de passe manquant
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", upload.none(), login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *       401:
 *         description: Token d'accès requis
 *       403:
 *         description: Token invalide ou expiré
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/profile", authenticateToken, getProfile);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Déconnexion réussie",
  });
});

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Liste de tous les utilisateurs
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/categories:
 *   get:
 *     summary: Liste de toutes les catégories
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/compagnon/{id}:
 *   patch:
 *     summary: Modifier le nom et le type de l'accompagnateur
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               compagnon_nom:
 *                 type: string
 *               compagnon_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/compagnon/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.update({
      compagnon_nom: req.body.compagnon_nom,
      compagnon_type: req.body.compagnon_type,
    });

    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
