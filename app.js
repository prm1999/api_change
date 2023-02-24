// importing express

const express =require('express');
// using for morgon 
const morgan=require('morgan');

const tourRouter=require('./router/tourRouter');
const userRouter=require('./router/userRouter');



const app=express();


app.use(morgan('dev'));

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


// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours/:id',getTour)
// app.get('/api/v1/tours',getAllTours)
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);






// app.use('/api/v1/users',tourUser)

// const tourRouter=express.Router();
// const userRouter=express.Router();






// for user route





app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/user',userRouter);


// server creation
const port =3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})

