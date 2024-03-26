const express=require('express');
const morgan=require('morgan');
const {createProxyMiddleware}=require('http-proxy-middleware');
//const {PORT}=require('./config/server-config');
const rateLimit=require('express-rate-limit');
const axios=require('axios');
const app=express();
const limiter=rateLimit({
  windowMs:2*60*1000,
  max:5
});
function  setupAndStartServer()
{
  app.use(morgan('combined'));
  app.use(limiter);

  app.use('/bookingservice',async (req,res,next)=>{
    console.log(req.headers['x-access-token']);
    try {
      const response=await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
        headers:{
          'x-access-token':req.headers['x-access-token']
        }
      });
    console.log(response);
    if(response.data.success)
    {
      next();
    }
    // else
    // {
    //     res.status(401).json({
    //        message:'Unauthorised'
    //     })
    // }

    } catch (error) {
      res.status(401).json({
        message:'Unauthorised'
      })
    }
 
  });
  app.use('/bookingservice',createProxyMiddleware({target:'http://localhost:3003/',changeOrigin:true}));
  
  app.get('/home',(req,res)=>{
    return res.json({
        message:"OK"
    });
  });
  app.listen(3007,()=>{
    console.log(`Server Started At port 3007`);
  });
}
setupAndStartServer();
