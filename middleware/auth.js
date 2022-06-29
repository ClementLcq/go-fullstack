// On importe jsonwebtoken

const jwt = require('jsonwebtoken');

// et on exporte le middleware
module.exports = (req, res, next) => {
    try {
        // On récupère notre token 
        // On récupère le header et spliter le string en un tableau autour de l'espace entre
        // notre mot clé Bearer et notre Token
        const token = req.headers.authorization.split(' ')[1];
        //Ensuite on décode le token en faisant appel à la fonction verify de jwt
        // à laquelle on passe le token ainsi que la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN-SECRET');
        // On récupère maintenant le userId pour le décoder
        const userId = decodedToken.userId;
        // et on ajoute cette valeur à l'objet request qui est tranmis aux routes appellées par la suite
        req.auth = {
            userId: userId
        };
    } catch (error) {
        res.status(401).json({ error });
    }
}