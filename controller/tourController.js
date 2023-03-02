// importing file system
// const fs=require('fs');

// importing data from the model
const Tour=require('./../models/tourModel');



// middleware


// importing data in form of json

// const tours=JSON.parse(
//     fs.readFileSync(`${__dirname}/../data/simple.json`)
// )

// for only middleware

// exports.checkID=(req,res,next,val)=>{
//     console.log(`Tour is ${val}`);

//     if(req.params.id>tours.length){
//         return res.status(404).json({
//             status:'fail',
//             message:'invalid'
//         })
//     }
//     next();//it is important put next
// }

// first send request and then send the response
exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'fail',
            message:'Missing name and price'
        });
    }
    next();
};



// for get api
exports.getAllTours=(req,res)=>{

    console.log(req.requestTime);

    res.status(200).json({
        status:'success',
        // results:tours.length,
        // requestAt:req.requestTime,
        // data:{
        //     tours
        // }
    })

}


// for get api on the basis of the id
exports.getTour=(req,res)=>{
    console.log(req.params);

    const id=req.params.id*1;


    // const tour_id=tours.find(el=>el.id===id);

    // res.status(200).json({
    //     status:'success',
    //     results:tours.length,
    //     data:{
    //         tour_id
    //     }
    // })

}



// for post api
exports.createTour=(req,res)=>{
    res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
    });

    // console.log(req.body);
    // const newId=tours[tours.length-1].id+1;
    // const newTour=Object.assign({id:newId},req.body);

    // tours.push(newTour);
    // fs.writeFile(
    //     `${__dirname}/data/simple.json`,
    //     JSON.stringify(tours),
    //     err=>{
    //         res.status(201).json({
    //             status:'success',
    //             data:{
    //                 tour:newTour
    //             }
    //         });
    //     }
    // );

}


exports.deleteTour=(req,res)=>{



    res.status(204).json({
        status:'success',
        data:null
    })
}


// for delete options
exports.updateTour=(req,res)=>{

    // const id=req.params.id*1;
    // if(id>tours.length){
    //     return res.status(404).json({
    //         status:'fail',
    //         message:"invalid Id"
    //     });
    // }


    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour'
        }
    })
}




