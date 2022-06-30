const express = require('express');
// On importe le middleware d'authentification
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');


const stuffCtrl = require('../controllers/stuff');

// On passe en avant le gestionnaire d'auth
// on ajoute le multer entre l'authentification et la route
// et on va modifier la route car la format multer change la requête
router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);

module.exports = router;