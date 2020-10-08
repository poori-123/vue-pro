const express = require('express');
const clientUser = require('../model/clientUser');


const router = new express.Router();

router.post('/add', async (req,res)=>{
    var {username,password} = req.body;

    var result = await clientUser.findOne({username});
    if(result){
        res.status(200).json({code: -1, message: '用户名已被占用!'});
        return;
    }
    var success = await new clientUser({username, password}).save();
    if(success){
        res.status(200).json({code: 0, message: '注册成功!'});
    }else{
        res.status(200).json({code: -1, message: '注册失败!'});
    }
});

router.post('/login', async (req,res)=>{
    var {username,password} = req.body;
    var result = await clientUser.findOne({username,password},{password: false});
    if(result){
        req.session.clientUser = result;
        res.status(200).json({code: 0, message: '登录成功!'});
    }else{
        res.status(200).json({code: -1, message: '用户名或密码错误!'});
    }
});

router.use((req,res,next)=>{
    if(req.session.clientUser){
        next();
    }else{
        res.status(200).json({code: -1,message: '请先登陆!'});
    }
});

router.get('/islogin', (req,res)=>{
    res.status(200).json({code: 0, message: '已经登录!'});
});

router.get('/logout', (req,res)=>{
    req.session.clientUser = null;
    delete req.session.clientUser;
    res.status(200).json({code: 0, message: '退出成功!'});
});

router.get('/getinfo', async (req,res)=>{
    var id = req.session.clientUser._id;
    var result = await clientUser.findById(id, {password: false});
    if(result){
        res.status(200).json({code: 0, message: '获取成功!', data: result});
    }
})

module.exports = router;