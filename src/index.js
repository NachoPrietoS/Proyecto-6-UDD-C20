require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const User = require("./models/Users");
const Game = require("./models/Games");

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

//middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok'});
})

app.get('/games', async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json({ games });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al obtener los juegos', error: error.message });
    }
});

app.post('/games', async (req, res) => {
    try {
        const { title, price, platform } = req.body;
        const newGame = await Game.create({ title, price, platform });
        if (!newGame) return res.status(400).json({ message: 'No se pudo crear el juego' });
        return res.status(201).json({ message: 'Juego creado exitosamente', game: newGame });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al crear el juego', error: error.message });
    }
});

app.put('/games/:id', async (req, res) => {
    try {
        const { title, price, platform } = req.body;
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            { title, price, platform },
            { new: true, runValidators: true }
        );
        if (!updatedGame) return res.status(404).json({ message: 'Juego no encontrado' });
        return res.status(200).json({ message: 'Juego actualizado exitosamente', game: updatedGame });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al actualizar el juego', error: error.message });
    }
});

app.delete('/games/:id', async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) return res.status(404).json({ message: 'Juego no encontrado' });
        return res.status(200).json({ message: 'Juego eliminado exitosamente', game: deletedGame });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al eliminar el juego', error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al obtener los usuarios', error: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
        return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al crear el usuario', error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al actualizar el usuario', error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al eliminar el usuario', error: error.message });
    }
});

app.listen(PORT, ()=>{
    console.log(`El servidor corre en el puerto ${PORT}`);
})