const mongoose = require('mongoose');

module.exports = mongoose.model('dishType',{
    typeName: {
        type: String,
        required: true,
    },
    typeSort:{
        type: String,
        required: true,
    },
    typeShowNav: {
        type: Boolean,
        default: true,
    },
    typeCount: {
        type: Number,
        default: 0
    }
})