// importing express

const express =require('express');
// using for morgon 
const morgan=require('morgan');

const tourRouter=require('./router/tourRouter');
const userRouter=require('./router/userRouter');



const app=express();

// MIDDLEWARE
if(process.env.NODE_ENV==='development')
    {
        app.use(morgan('dev'));

    }
// middleware for convert post data in the json format
app.use(express.json());

// middleware

// app.use((req,res,next)=>{
//     console.log("hello from middleware");
//     next();
// })


// date middleware


app.use((req,res,next)=>{
    res.requestTime=new Date().toISOString();
    next();
})



// for user route


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

// Route handler in case of wrong router is provided
// * for all then make the middleware
// original url is for the url that has been requested
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`can't find ${req.originalUrl} on this server`

    })
})



module.exports=app;