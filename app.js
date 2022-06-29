// On importe express
const express = require('express');

// On crée l'application
const app = express();

// Mongoose
const mongoose = require('mongoose');

// On importe le router
const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://clementlecocq:arcadia09031990PAPADE@cluster0.wipzo.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Accès au corps de la requête, ce middleware intercepte toutes les requêtes
// qui ont un content type json et nous mettre à disposition ce contenu sur l'objet requête
// idem que bodyparser, ancienne version
app.use(express.json());

// On utilise la méthode app.use pour les requêtes et réponses
// Ceci est un middleware, fonction qui reçoit la requête et la réponse et qui les gère
// fonctio  next permet de renvoyer au prochain middleware

//On crée un middleware général pour gérer le CORS et les autorisations
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Et on exporte l'app pour y accéder depuis les autres fichiers, notamment notre server node

module.exports = app;