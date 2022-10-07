'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let pokemon = ["Tyrannitar", "Kadabra", "Mewtwo", "Eevee", "Pikachu"];

app.use((req,res,next) => {
    console.log(`Request received at ${new Date()}`);
    return next()
})


app.get('/getAll', (req,res,next) => {
    if (pokemon.length == 0) return next({ status: 404, message: "No pokemon"});
    res.send(pokemon);
})

app.post('/addPokemon', (req,res,next) => {
    if (!req.body.name) return next({
        status: 404,
        message: "Invalid pokemon entry"
    });
    const newPokemon = req.body.name;
    console.log(`Request received for ${newPokemon} to be added`);
    pokemon.push(newPokemon);
    res.send(`Success, ${newPokemon} added!`);
})

// error handling
app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || `Unknown error`);
    next();
})



// start the server
const server = app.listen(4417, () => {
    console.log(`Server successfully started on port ${server.address().port}`);
})
