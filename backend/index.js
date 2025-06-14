const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const sequelize = require('./models');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);

sequelize.sequelize.authenticate()
    .then(() => {
        console.log('✅ Connexion à la base de données réussie');
        return sequelize.sequelize.sync(); // Ajoute ça pour être sûr que les tables existent
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erreur de connexion à la base de données :', err.message);
    });
