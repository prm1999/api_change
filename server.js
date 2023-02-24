const app=require('./app')


// server creation
const port =3000;
app.listen(port,()=>{
    console.log(`App runing in the port ${port}`);
})
