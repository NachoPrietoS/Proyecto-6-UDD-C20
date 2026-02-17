require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const Game = require("./models/Games")

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok'});
})

app.listen(3000, ()=>{
    console.log('El servidor corre en el puerto 3000');
})