require('dotenv').config();

console.log('=== STARTING APP INITIALIZATION ===');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js'); 

console.log('✅ Modules basiques charges');


console.log('=== CHECK DE CONNEXION AVEC SUPABASE ===');

let supabase;
try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        throw new Error('Supabase URL or Key missing in environment variables');
    }

    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log('✅ Initialisation de supabase client');


    (async () => {
        try {
            console.log('⏳ Test de connexion avec Supabase...');
            const { data, error } = await supabase
                .from('users') 
                .select('*')
                .limit(1);

            if (error) throw error;

            console.log('✅ Connexion avec Supabase reussi');
            console.log(`ℹ️ Server location: ${supabase.supabaseUrl}`);
            console.log(`ℹ️ Connected as: ${process.env.SUPABASE_KEY.substring(0, 10)}...`); 
        } catch (err) {
            console.error('❌ Supabase connection error:', err.message);
            console.error('Error details:', err);
        }
    })();
} catch (err) {
    console.error('❌ Supabase initialization failed:', err.message);
}


console.log('=== VARIABLES D&apos;ENVIRONNEMENT ===');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'EXISTS' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'EXISTS' : 'MISSING');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);


console.log('=== CHARGEMENT DES ROUTES ===');

let authRouter;

try {
    authRouter = require('./routes/authRoutes');
    console.log('✅ authRouter charge avec succes, type:', typeof authRouter);
} catch (err) {
    console.error('❌ Error loading authRouter:', err.message);
    console.error('Stack:', err.stack);
}

const app = express();

console.log('=== CONFIGURATION DES MIDDLEWARES ===');


app.use(cors());
console.log('✅ middleware CORS ajoute');

app.use(morgan('dev'));
console.log('✅ middleware Morgan ajoute');

app.use(express.json());
console.log('✅ middleware JSON parser ajoute');

app.use(cookieParser());
console.log('✅ Cookie Parser ajoute');

console.log('=== SETTING UP ROUTES ===');


try {
    if (authRouter) {
        app.use('/api/auth', authRouter);
        console.log('✅ Auth routes enregistre');
    } else {
        console.log('⚠️ Skipping auth routes (not loaded)');
    }
} catch (err) {
    console.error('❌ Error registering auth routes:', err.message);
}


app.use((err, req, res, next) => {
    console.error('=== GLOBAL ERROR HANDLER ===');
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    
    res.status(500).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

console.log('✅ Global error handler added');

const PORT = process.env.PORT || 3001;

console.log('=== STARTING SERVER ===');

app.listen(PORT, () => {
    console.log('🚀 Le serveur ecoute sur le port', PORT);
    console.log('=== SERVEUR DEMARRRE AVEC SUCCES ===');
    console.log('=== STATUT DE L&apos;APPLICATION ===');
    console.log(`- Base de donnees: ${supabase ? 'Connected' : 'Not connected'}`);
    console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`- API Base URL: http://localhost:${PORT}/api`);
});