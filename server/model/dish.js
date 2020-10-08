const mongoose = require('mongoose');

module.exports = mongoose.model('dish',{
    dishName: {
        type: String,
        required: true,
    },
    dishType:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'dishType',
        required: true,
    },
    dishIntro: String,
    dishPrice: {
        type: Number,
        required: true,
    },
    dishUnit: String,
    dishTage: String,
    dishImg: String,
    dishSales: {
        type: Number,
        default: 0
    }
})