const express = require('express');
const User = require('../model/user');

var router = new express.Router();

User.findOne({username: 'admin'})
.then(res=>{
    if(!res){
        new User({username: 'admin', password: 'admin', isAdmin: true}).save();
    }
})

router.post('/login', async (req,res)=>{
    var {username,password} = req.body;

    var result = await User.findOne({username,password},{password: false});
    if(result){
        req.session.user = result;
        res.status(200).json({code: 0, message: '登录成功!', data: result});
    }else{
        res.status(200).json({code: -1, message: '用户名或密码错误!'});
    }
});

router.post('/resetpsd', async (req,res)=>{
    var {username,password} = req.body;
    
    var result = await User.findOne({username});
    if(result){
        var up = await User.findOneAndUpdate({username},{password});
        res.status(200).json({code:0,message:'密码重置成功!'});
    }else{
        res.status(200).json({code:-1,message:'账号不存在!'});
    }
})

router.post('/register', async (req,res)=>{
    var {username, password, auth} = req.body;
    var result = await User.findOne({username});
    if(result){
        res.json({code: -1, message: '用户名已被占用!'});
        return
    }
    var nu = await new User({username, password, auth}).save();
    if(nu){
        res.json({code: 0, message: '添加成功!'});
    }else{
        res.json({code: -1, message: '添加失败!'});
    }
})

router.use((req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.status(200).json({code: -1,message: '请先登陆!'});
    }
});

router.get('/isLogin',(req,res)=>{
    res.status(200).json({code: 0,message: '已登录!'});
});

router.get('/logout', (req,res)=>{
    req.session.user = null;
    delete req.session.user;
    res.status(200).json({code:0,message:'退出成功!'});
})


module.exports = router;