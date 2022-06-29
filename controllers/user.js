// Middleware d'authentification
// On installe le package bcrypt npm install --save bcrypt
// On installe le package jsonwebtoken npm install --save jsonwebtoken
// et on les importe

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signup = (req, res, next) => {
    // On commence par crypter le mdp, asynchrone car ça prends du temps
    // 10 = nombre de tour de l'algo pour crypté
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                // On renvoie une erreur si on ne trouve pas l'identifiant
                // mais pour ne pas créer de fuite de données, on renvoie un message vague
                res.status(401).json({ message: 'Paire identifiant/mdp incorrect' })
            } else {
                // Utilisation de la fonction compare de bcrypt pour comparer les hash
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            // Si mot de passe faux, on renvoie la même erreur
                            res.status(401).json({ message: 'Paire identifiant/mdp incorrect' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error })
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};