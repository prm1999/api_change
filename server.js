const dotenv=require('dotenv');

const app=require('./app');

dotenv.config({path:'./config.env'});




// server creation
const port =process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})
