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
    // res.status(404).json({
    //     status:'fail',
    //     message:`can't find ${req.originalUrl} on this server`

    // })
    // for unhandled route
    const err=new Error(`can't find ${req.originalUrl} on this server`);
    err.status='fail';
    err.statusCode=404;
    
    // next will do the things which will apply that next function error
    // next will be access the global handling error
    next(err)
})

// use middleware for the handling the error
app.use((err,req,res,next)=>{
    // Internal server error
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';


    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
})


module.exports=app;