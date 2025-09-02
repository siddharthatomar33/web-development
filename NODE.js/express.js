const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("This is home page");
});
app.get('/about',(req,res)=>{
    res.send("This is about page");
});
app.get('/contact',(req,res)=>{
    res.send("This is contact page");
}); 


app.listen(8000,()=>{
    console.log("server is loading");
});
