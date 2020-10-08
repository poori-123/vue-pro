const express = require('express');
const url = require('url');
const dish = require('../model/dish');
const dishType = require('../model/dish-type');

const router = new express.Router();

router.get('/add', async (req,res)=>{
    var {query} = url.parse(req.url,true);
    var result = await new dish(query).save();
    
    var type = await dishType.findById(query.dishType, {typeCount:true});
    var count = type.typeCount;
    var newCount = Number(count) + 1;
    var t = await dishType.findByIdAndUpdate(query.dishType, {typeCount: newCount});

    if(result){
        res.status(200).json({code:0,message:'添加成功!'});
    }else{
        res.status(200).json({code:-1,message:'添加失败!'});
    }
});

/* 后台初始化获取菜品列表，前六项及总条数 */
router.get('/getInit', async (req,res)=>{
    var result = await dish.find();
    var length = result.length;
    var data = result.splice(0,6);
    if(result){
        res.status(200).json({code:0, message: '初始化成功!', length, data});
    }else{
        res.status(200).json({code:-1, message: '初始化失败！'});
    }
});

/* 后台切换页数获取菜品列表 */
router.get('/get', async (req,res)=>{
    var {query: {page}} = url.parse(req.url,true);
    var result = await dish.find().skip(6*(page-1)).limit(6);
    if(result){
        res.status(200).json({code:0, message: '获取成功!', data: result});
    }else{
        res.status(200).json({code: -1, message: '获取失败!'});
    }
});

router.get('/del', async (req,res)=>{
    var {query: {id}} = url.parse(req.url, true);
    var result = await dish.findByIdAndDelete(id);

    var dishId = result.dishType;
    var type = await dishType.findById(dishId);
    var count = type.typeCount;
    var newCount = Number(count) - 1;
    var t = await dishType.findByIdAndUpdate(dishId, {typeCount: newCount});

    if(result){
        res.status(200).json({code:0,message:'删除成功!'});
    }else{
        res.status(200).json({code:-1,message:'删除失败!'});
    }
})


/* 客户端获取所有菜品列表 */
router.get('/getAll', async (req,res)=>{
    var result = await dish.find().sort({dishSales: -1});
    console.log(result);
    if(result){
        res.status(200).json({code:0, message: '获取成功!', dishes: result});
    }else{
        res.status(200).json({code:-1, message: '获取失败!'});
    }
})

module.exports = router;