const http = require('http');
const app = require('./app');

// On crée une fonction qui renvoie un port valide, que ce soit un number ou string
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT ||  '3000');
app.set('port', port);

// On crée une fonction qui va rechercher les différentes erreurs
// et les gérer de manière appropriée
// On l'enregistre ensuite dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

// Un écouteur d'événement est également enregistré, consignant le port ou le canal
// nommé sur lequel le serveur s'exécute
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);


/*
// Création du serveur, programme qui va écouter et répondre à des requêtes http
// On importe le package http de node et on récupère l'app

const http = require('http');
const app = require('./app');

// On signifie le port
app.set('port', process.env.PORT || 3000);

// On crée le serveur avec l'application en paramètre
const server = http.createServer(app);

// Le serveur est prêt, il doit maintenant écouter et attendre les requêtes

server.listen(process.env.PORT || 3000)*/