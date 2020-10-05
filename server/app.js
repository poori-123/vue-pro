const express = require('express');

var app = express();


// 创建session仓库
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
 
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/my-pro',
  collection: 'sessions'
});
 
store.on('error', function(error) {
  console.log(error);
});
 
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use(express.urlencoded());
app.use(express.json());
app.use('/api/user', require('./routers/userRouter'));
app.use('/api/table', require('./routers/tableRouter'));

module.exports = app;