const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

moduke.exports = mongoose.model('User', userSchema);



// Ajout de unique : true pour empecher deux utilisateurs avec même adresse
// + ajout du package mongoose-unique-validator