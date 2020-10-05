const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

mongoose.connect('mongodb://localhost:27017/my-pro',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(error)=>{
    if(error){
        console.log('连接数据库失败!');
        console.log(error);
    }else{
        console.log('连接数据库成功!');

        var server = http.createServer(app);

        server.on('error',(error)=>{
            console.log('服务启动失败!');
            console.log(error);
        });
        server.listen(8000,'localhost',()=>{
            console.log('服务启动成功!');
            console.log('http://localhost:8000');
        })
    }
})