const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const sequelize = require('./models');
const authRoutes = require('./routes/auth');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});


app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});


sequelize.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie');
    return sequelize.sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
      console.log(`📝 Route d'inscription: POST http://localhost:${PORT}/api/auth/inscription`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à la base de données :', err.message);
    process.exit(1);
  });
    