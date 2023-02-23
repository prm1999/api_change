// importing express

const express =require('express');


const app=express();


// for get request
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'hello from server'
        
    });
})

// for post request
app.post('/',(req,res)=>{
    res.send('You can get the data');
})

// server creation
const port =3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})

