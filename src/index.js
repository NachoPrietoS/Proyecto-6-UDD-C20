require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const gameRouter = require('./routes/game.routes');
const userRouter = require('./routes/user.routes');
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

//middleware
app.use(express.json());

app.use('/users', userRouter);
app.use('/games', gameRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok'});
});

//Metodos para usuarios
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json({ users });
//     } catch (error) {
//         res.status(500).json({ message: 'hubo un error al obtener los usuarios', error: error.message });
//     }
// });

// app.post('/users', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const newUser = await User.create({ username, email, password });
//         if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
//         return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'hubo un error al crear el usuario', error: error.message });
//     }
// });

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
//         return res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
//     } catch (error) {
//         res.status(500).json({ message: 'hubo un error al eliminar el usuario', error: error.message });
//     }
// });

app.listen(PORT, ()=>{
    console.log(`El servidor corre en el puerto ${PORT}`);
})