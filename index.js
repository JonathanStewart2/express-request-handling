'use strict';

const express = require("express");
const app = express();
app.listen(4485);


let tdpers = ["James", "Aysha", "Yamuna", "Rachael", "Jonathan"];


app.get('/', (req, res) => {
    console.log("Hello, my name is Skynet!");
})

app.get('/getAll', (req, res) => {
    console.log(tdpers);
})


const server = app.listen(() => {
    console.log(`Server started succesfully on port ${server.address().port}`);
})