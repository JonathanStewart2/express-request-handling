'use strict';

const express = require("express");
const app = express();
const routes = require("./route.js");
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const logger = (req, res, next) => {
    console.log("Request received at", new Date());
    next();
}


app.get('/', (req, res) => {
    console.log("Hello, my name is Skynet!");
    res.send("Hello, my name is Skynet!");
})


app.use(logger, routes);


// error handling
app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || `Unknown error`);
    next();
})


const server = app.listen(4417, () => {
    console.log(`Server started succesfully on port ${server.address().port}`);
})

