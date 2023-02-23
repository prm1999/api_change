// importing file system
const fs=require('fs');
// importing express

const express =require('express');


const app=express();

// middleware for convert post data in the json format
app.use(express.json());



// importing data

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/data/simple.json`)
)
// for get api
const getAllTours=(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })

}


// for get api on the basis of the id
const getTour=(req,res)=>{
    console.log(req.params);

    const id=req.params.id*1;
// // instead of the below line use !tours
//     if(id>tours.length){
//         return res.status(404).json({
//             status:'fail',
//             message:"invalid Id"
//         });
//     }


    const tour_id=tours.find(el=>el.id===id);
    if(!tour_id){
        return res.status(404).json({
            status:'fail',
            message:"invalid Id"
        });
    }

    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tour_id
        }
    })

}



// for post api
const createTour=(req,res)=>{
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
    // not expected
    // res.send("done");

}


const deleteTour=(req,res)=>{

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:"invalid Id"
        });
    }


    res.status(204).json({
        status:'success',
        data:null
    })
}


// for delete options
const updateTour=(req,res)=>{

    const id=req.params.id*1;
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
            message:"invalid Id"
        });
    }


    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour'
        }
    })
}
app.post('/api/v1/tours',createTour);
app.get('/api/v1/tours/:id',getTour)
app.get('/api/v1/tours',getAllTours)
app.patch('/api/v1/tours/:id',updateTour);
app.delete('/api/v1/tours/:id',deleteTour);



// server creation
const port =3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})

