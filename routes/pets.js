const { Router } = require('express');
const express = require('express');
const apps = require('../app');
const router = express.Router();
const app = express();
const path = require("path");


app.use(express.urlencoded({ extended: false}));


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'mysql04-farm36.kinghost.net',
      user : 'laravozo',
      password : 'mmdozmmqps10029',
      database : 'laravozo'
    }
  });


//introdução ao trabalho
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: "bem vindo ao rest api do lipo"
    });
});


//retorna baseado no nome dado na URL
router.get('/nomes/:nome',(req,res,next)=>{
    const nome = req.params.nome;
    knex('pet').where({
        nome: nome
    })
    .then((nome)=>{
        console.log(nome);
        res.send(nome);
        
        
    })
    .catch(function(err){
        res.send("erro :(")
        console.log(err)
    })
});


//retorna todos os pets e suas informações
router.get('/cadastrados',(req,res,next)=>{
    knex.select('*').from('pet').then((pets)=>{
        res.status(200).send(pets)
    })
})


//retorna lista de nomes cadastrados
router.get('/nomes',(req,res,next)=>{
    knex.select('nome').from('pet').then((nomes)=>{
        res.status(200).send(nomes)
    })

})



router.get('/novoPet',(req,res,next)=>{

    const index = path.normalize(__dirname + "/.." + "/html/index.html")
    res.sendFile(index)
})



router.post('/novoPet',(req,res,next)=>{
    knex.insert(req.body).into("pet").then(function(a){
        res.send("ok")
    })
    .catch(function(error) { console.error(error); });
});






router.post('/novoPet2',(req,res,next)=>{
    knex.insert(req.body).into("pet").then(function(a){
        res.send("pet adicionado")
    })
    
})







module.exports = router;