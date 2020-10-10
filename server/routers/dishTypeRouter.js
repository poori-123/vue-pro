const express = require('express');
const dishType = require('../model/dish-type');
const url = require('url');

const router = new express.Router();

router.post('/add', async (req,res)=>{
    var {name,sort,showNav} = req.body;
    var result = await new dishType({
        typeName: name,
        typeSort: sort,
        typeShowNav: showNav
    }).save();
    if(result){
        res.status(200).json({code:0,message:'添加成功！'});
    }else{
        res.status(200).json({code:-1,message:'添加失败！'});
    }
    
});

/* 后台获取菜品分类 */
router.get('/get', async (req,res)=>{
    var result = await dishType.find().sort({typeSort: 1});
    if(result){
        res.status(200).json({code:0,message:'获取成功!',list:result});
    }else{
        res.status(200).json({code:-1,message:'获取失败!'});
    }
    
});

router.post('/del', async (req,res)=>{
    var {id} = req.body;
    var result = await dishType.findByIdAndDelete(id);
    if(result){
        res.status(200).json({code:0, message: '删除成功!'});
    }else{
        res.status(200).json({code:-1, message: '删除失败!'});
    }
})

/* 客户端获取菜品分类 */
router.get('/getApp', async (req,res)=>{
    var result = await dishType.find({typeShowNav: true}).sort({typeSort:1});
    if(result){
        res.status(200).json({code:0, message: '获取成功!', type: result});
    }else{
        res.status(200).json({code:-1, message: '获取失败!'});
    }
});

router.get('/getDetail', async (req,res)=>{
    var {id} = url.parse(req.url,true).query;
    var result = await dishType.findById(id);
    if(result){
        res.json({code: 0, message: '获取成功!', data: result});
    }else{
        res.json({code: -1, message: '获取失败!'});
    }
})

router.get('/editType', async (req,res)=>{
    var query = url.parse(req.url,true).query;
    var id = query.id;
    delete query.id;
    var result = await dishType.findByIdAndUpdate(id,query);
    if(result){
        res.json({code: 0, message: '修改成功!'})
    }else{
        res.json({code: -1, message: '修改失败!'});
    }
})

module.exports = router;