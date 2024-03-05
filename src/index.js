const express=require('express');
const morgan=require('morgan');
const {createProxyMiddleware}=require('http-proxy-middleware');
const {PORT}=require('./config/server-config');
const app=express();
function  setupAndStartServer()
{
  app.use(morgan('combined'));
  app.get('/home',(req,res)=>{
    return res.json({
        message:"OK"
    });
  });
  app.listen(PORT,()=>{
    console.log(`Server Started At port ${PORT}`);
  });
}
setupAndStartServer();