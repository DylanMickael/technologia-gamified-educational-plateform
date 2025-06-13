const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());




sequelize.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie');


    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à la base de données :', err.message);
  });
