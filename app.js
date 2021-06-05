const express = require("express");
const { send } = require("process");
const app = express();
app.use(express.urlencoded({ extended: false}));


const rotaPets = require('./routes/pets');

app.use('/pets', rotaPets);




app.get('/',(req,res)=>{
    res.send("bem vindo ao rest API do lipo");
});

module.exports = app;