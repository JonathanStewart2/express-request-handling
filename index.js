'use strict';

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

let pokemon = ["Tyrannitar", "Kadabra", "Mewtwo", "Eevee", "Pikachu"];

app.use((req, res, next) => {
    console.log("Request received at", new Date());
    return next();
})


app.get('/', (req, res) => {
    console.log("Hello, my name is Skynet!");
    res.send("Hello, my name is Skynet!");
})


app.get('/getAll', (req, res) => {
    console.log(pokemon);
    res.send(pokemon);
})


app.get('/find/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ID requested: ${id}`);

    res.send(pokemon[id]);
    console.log(`Returned ${pokemon[id]} for the above ID`);
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Deleting pokemon with ID: ${id}`);
    let removed = pokemon.splice(id, 1);
    console.log(`Remaining Pokemon: ${pokemon}`);
    res.send(`${removed} was deleted!`);
})


//request handler which creates a new name in the array by sending
// JSON object in the request body
app.post('/addPokemon', (req, res) => {
    const reqObj = req.body.name;
    console.log(`Pokemon received:  ${reqObj}`);
    pokemon.push(reqObj);
    res.status(201).send(pokemon);
})


app.put('/replace/:id', (req, res) => {
    const id = req.params.id;
    const name = req.query.name;
    console.log(id, name);
    pokemon[id] = name;
    console.log(`${name} added to Pokemon.`);
    console.log(pokemon);
    res.send(pokemon)
})

const server = app.listen(4417, () => {
    console.log(`Server started succesfully on port ${server.address().port}`);
})


//nodemon - automatically restarts server when code changes
// "names": "nodemon index.js" in package.json