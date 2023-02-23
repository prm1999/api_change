// importing file system
const fs=require('fs');
// importing express

const express =require('express');


const app=express();

// middleware for convert post data in the json format
app.use(express.json());


// // for get request
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message:'hello from server'
        
//     });
// })

// // for post request
// app.post('/',(req,res)=>{
//     res.send('You can get the data');
// })

// importing data

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/data/simple.json`)
)
// for get api
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })

})


// for post api

app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/data/simple.json`,
        JSON.stringify(tours),
        err=>{
            res.status(201).json({
                status:'success',
                data:{
                    tour:newTour
                }
            });
        }
    );
    res.send("done");

})


// server creation
const port =3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})

