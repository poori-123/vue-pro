const express = require('express');
const dishType = require('../model/dish-type');

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

module.exports = router;