'use strict';

const router = require("express").Router()

let pokemon = ["Tyrannitar", "Kadabra", "Mewtwo", "Eevee", "Pikachu"];

router.get('/getAll', (req,res,next) => {
    if (pokemon.length == 0) return next({ status: 404, message: "No pokemon"});
    res.send(pokemon);
})

router.get('/find/:id', (req,res,next) => {
    const id = req.params.id;
    if (id >= pokemon.length) return next( {status: 404, message: "Invalid ID or ID does not exist"} );
    res.send(pokemon[id]);
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Deleting pokemon with ID: ${id}`);
    let removed = pokemon.splice(id, 1);
    console.log(`Remaining Pokemon: ${pokemon}`);
    res.send(`${removed} was deleted!`);
})


//request handler which creates a new name in the array by sending
// JSON object in the request body
router.post('/addPokemon', (req,res,next) => {
    if (!req.body.name) return next({
        status: 404,
        message: "Invalid pokemon entry"
    });
    const newPokemon = req.body.name;
    console.log(`Request received for ${newPokemon} to be added`);
    pokemon.push(newPokemon);
    res.send(`Success, ${newPokemon} added!`);
})


router.put('/replace/:id', (req, res) => {
    const id = req.params.id;
    const name = req.query.name;
    console.log(id, name);
    pokemon[id] = name;
    console.log(`${name} added to Pokemon.`);
    console.log(pokemon);
    res.send(pokemon)
})


module.exports = router;