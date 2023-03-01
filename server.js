// importing mongoose package

const mongoose=require('mongoose');



const dotenv=require('dotenv');

const app=require('./app');

dotenv.config({path:'./config.env'});



// Password for online


// const DB=process.env.DATABASE.replace{
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// }
// connection for mongoose package

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(conn=>{
    console.log(conn.connections);
    console.log("DB connected succesfully")
})


// creating the schema
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"A tour name"],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5,

    },
    price:{
        type:Number,
        require:[true,"A tour have a price"]
    }
})

const Tour=mongoose.model("Tour",tourSchema);

// manually data to the model
const testTour=new Tour({
    name:"The forest ",
    rating:4.7,
    price:678
});

testTour.save().then(doc=>{
    console.log(doc);
})
.catch(err=>{
    console.log('Err',err);
})

// server creation
const port =process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})
