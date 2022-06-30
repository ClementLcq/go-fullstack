// On importe multer
const multer = require('multer');

// On crée un dictionnaire pour les extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// et on crée un objet de configuration pour multer
// en utilisant la fonction diskStorage() de multer

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        // On va changer le nom, notamment en remplaçant les espaces par des _
        const name = file.originalname.split(' ').join('_');
        // puis on applique une extension au fichier en récupérant le dictionnaire
        const extension = MIME_TYPES[file.mimetype];
        // puis on appelle le callback avec un argument null pour vérifier qu'il n'y a pas d'erreur
        // puis on créé le filename entier en ajoutant un timestamp
        callback(null, name + Date.now() + '.' + extension);

    }
});

// et enfin on exporte le middleware configuré
module.exports = multer({ storage }).single('image');