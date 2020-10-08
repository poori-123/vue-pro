const mongoose = require('mongoose');

module.exports = mongoose.model( 'order', {
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'clientUser',
        required: true,
    },
    tableId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'table',
        required: true,
    },
    orderList: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
    },
    pNum: {
        type: Number,
        default: 1,
    },
    remark: String,
    status: {
        type: String,
        default: '已完成'
    },
    time: {
        type: String,
        required: true
    }
} )