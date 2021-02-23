let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    thoughts: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema, 'pdg');

module.exports = User;
