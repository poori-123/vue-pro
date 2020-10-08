const mongoose = require('mongoose');

module.exports = mongoose.model('clientUser',{
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})