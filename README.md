# 🌱 EcoCity Backend API

Une API backend moderne et complète construite avec **Node.js**, **Express**, **Sequelize** et **MySQL**, incluant une documentation **Swagger interactive** et un **dashboard de monitoring en temps réel**.

## 🎯 Aperçu

EcoCity Backend est une solution complète pour la gestion d'utilisateurs avec authentification JWT, monitoring avancé et documentation API interactive.  
Parfait pour des applications web modernes nécessitant une base solide et sécurisée.

## ✨ Fonctionnalités principales

- 🔐 **Authentification JWT sécurisée** — Inscription, connexion, gestion des profils  
- 📚 **Documentation Swagger UI** — Interface interactive pour tester les APIs  
- 📊 **Dashboard de monitoring temps réel** — Métriques serveur via WebSocket  
- 🛡️ **Sécurité renforcée** — Rate limiting, Helmet, CORS, validation des données  
- 🗄️ **Base de données MySQL** — ORM Sequelize avec migrations et seeders  
- 🌐 **Accès réseau** — Configuration pour utilisation multi-PC  
- ⚡ **Performance optimisée** — Monitoring des temps de réponse et ressources  

## 🚀 Installation rapide

### 1. Prérequis

- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 2. Cloner le projet

```bash
git clone https://github.com/devhunt2025/project_repo.git
cd project_repo

### 3. Installer les dépendances
```bash
npm install

4. Configuration de l’environnement
Créez un fichier .env à la racine du projet :
env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecocity
DB_USER=root
DB_PASSWORD=

PORT=3000
NODE_ENV=development

JWT_SECRET=votre_cle_secrete_super_forte_ici_2024
SWAGGER_HOST=localhost:3000


5. Préparer la base de données
a. Créer la base dans MySQL
sql
CREATE DATABASE ecocity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

b. Exécuter les migrations et seeders
bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

6. Démarrer le serveur
bash
npm run dev
🎉 Le serveur est maintenant en ligne et prêt à recevoir des requêtes !

🌐 Accès aux services
Service	URL	Description
🏠 API principale	http://localhost:3000	Point d’entrée principal
📚 Swagger	http://localhost:3000/api-docs	Interface de test des APIs
📊 Dashboard	http://localhost:3000/dashboard	Métriques temps réel
💚 Health check	http://localhost:3000/health	État du serveur

🔐 Authentification (/api/auth)
Méthode	Endpoint	Description	Auth requise
POST	/api/auth/inscription	Créer un compte utilisateur	❌
POST	/api/auth/login	Se connecter	❌
GET	/api/auth/profile	Récupérer son profil	✅
POST	/api/auth/logout	Se déconnecter	❌

🧪 Exemples de requêtes
Inscription
bash
curl -X POST http://localhost:3000/api/auth/inscription \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "motdepasse123",
  "nom": "Doe",
  "prenom": "John",
  "role": "user",
  "adresse": "123 Rue de la Paix",
  "telephone": "+33123456789"
}'
Connexion
bash

curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "motdepasse123"
}'
Récupération du profil (avec token JWT)
bash
Copier
Modifier
curl -X GET http://localhost:3000/api/auth/profile \
-H "Authorization: Bearer VOTRE_TOKEN_JWT"
👥 Comptes de test (créés via seeders)
Email	Mot de passe	Rôle
admin@ecocity.com	admin123	admin
user@ecocity.com	user123	user
