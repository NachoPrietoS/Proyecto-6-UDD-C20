const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
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
}

exports.loginUser = async (req, res) => {
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
}

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al verificar el usuario', error: error.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, password: hashedPassword },
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al actualizar el usuario', error: error.message });
    }
}