const express = require('express');
const Table = require('../model/table');

const router = new express.Router();

// new Table({
//     tableId: 001,
//     tableType: '3-4',
//     tablePos: '大厅',
// }).save();

router.get('/list', async (req,res)=>{
    var result = await Table.find();
    res.status(200).json({code:0,message:'获取成功',data:result})
})

module.exports = router;