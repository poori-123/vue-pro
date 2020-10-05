const mongoose = require('mongoose');

module.exports = mongoose.model('table',{
    tableId: {
        type: String,
        required: true,
    },
    tableType: {
        type: String,
        required: true,
    },
    tablePos:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'free',
    }
})