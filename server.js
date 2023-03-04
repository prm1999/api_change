// importing mongoose package

const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});

const app=require('./app');




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
    // console.log(conn.connections);
    console.log("DB connected succesfully")
})


// creating the schema

// server creation
const port =process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})








// for running the debgger run 
// npm run debug
