const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Le segment de route indiqué ici est uniquement le segment final
// car le reste de l'adresse est déclarée dans notre appli Express


module.exports = router;