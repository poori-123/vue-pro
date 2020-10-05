const mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: '123456'
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})