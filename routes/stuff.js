const express = require('express');
// On importe le middleware d'authentification
const auth = require('auth');
const router = express.Router();


const stuffCtrl = require('../controllers/stuff');

// On passe en avant le gestionnaire d'auth
router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth, stuffCtrl.createThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);

module.exports = router;