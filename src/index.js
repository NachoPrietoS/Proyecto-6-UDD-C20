require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authorization");
const User = require("./models/Users");
const gameRouter = require('./routes/game.routes');

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

//middleware
app.use(express.json());

app.use('/games', gameRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok'});
})

//Metodos para juegos

app.post('/users/register', async(req, res) => {
    const { username, email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) return res.status(400).json({ message: 'El usuario ya existe' });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword });
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
        return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al crear el usuario', error: error.message });
    }
})

app.post('/users/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: 'Usuario no existe' });

        const correctPassword = await bcryptjs.compare(password, foundUser.password);
        if (!correctPassword) return res.status(400).json({ message: 'El email o la password no corresponde' });

        const payload = { user: { id: foundUser._id } };
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        });
    } catch (error) {
        res.json({ message: 'hubo un error al iniciar sesión', error: error.message });
    }
});

app.get('/users/verify-user', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al verificar el usuario', error: error.message });
    }
})

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

// app.put('/users/update', auth, async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);
//         const updatedUser = await User.findByIdAndUpdate(
//             req.user.id,
//             { username, email, password: hashedPassword },
//             { new: true, runValidators: true }
//         );
//         if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
//         return res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: 'hubo un error al actualizar el usuario', error: error.message });
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