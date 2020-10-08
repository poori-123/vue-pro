const express = require('express');
const Order = require('../model/order');
const dish = require('../model/dish');
const url = require('url');

var router = new express.Router();

router.get('/add', async (req,res)=>{
    var query = url.parse(req.url,true).query;
    var result = await new Order(query).save();

    var list = JSON.parse(query.orderList);
    list.forEach( async (item) => {
        var id = item.id;
        let d = await dish.findById(id);
        let sales = d.dishSales;
        var newS = Number(sales) + Number(item.count);
        var s = await dish.findByIdAndUpdate(id, {dishSales: newS});
    } )

    if(result){
        res.status(200).json({code: 0, message: '支付成功!'});
    }else{
        res.status(200).json({code: -1, message: '支付失败!'});
    }
});

router.get('/get', async (req,res)=>{
    var query = url.parse(req.url, true).query;
    var id = query.id;
    var result = await Order.find({userId: id}).sort({time:-1});

    res.status(200).json({code:0, message:'获取成功！', data:result});
});

router.get('/getall', async (req,res)=>{
    var result = await Order.find().sort({time: -1}).populate(['tableId']);

    res.status(200).json({code:0,message: '获取成功!', data: result});
})

module.exports = router;