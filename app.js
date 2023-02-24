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

app.use((req,res,next)=>{
    console.log("hello from middleware");
    next();
})


// date middleware


app.use((req,res,next)=>{
    res.requestTime=new Date().toISOString();
    next();
})



// for user route


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/user',userRouter);



module.exports=app;