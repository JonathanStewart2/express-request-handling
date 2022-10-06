'use strict';

const express = require("express");
const app = express();
app.listen(4485);
const bodyParser = require('body-parser')
app.use(bodyParser.json());
//app.use(express.json());

let pokemon = ["Tyrannitar", "Kadabra", "Mewtwo", "Eevee", "Pikachu"];


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
    const reqObj = req.body.addPokemon.name;

    console.log(`Pokemon received:  ${reqObj}`);
    pokemon.push(reqObj);
    res.send(pokemon);
})


app.post('/replace/:id', (req, res) => {
    const id = req.params.id;
    const name = req.query.name;
    console.log(id, name);
    pokemon[id] = name;
    console.log(`${name} added to Pokemon.`);
    console.log(pokemon);
    res.send(pokemon)
})

const server = app.listen(() => {
    console.log(`Server started succesfully on port ${server.address().port}`);
})