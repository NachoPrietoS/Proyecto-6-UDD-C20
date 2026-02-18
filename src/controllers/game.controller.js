const Game = require('../models/Games');

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json({ games });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al obtener los juegos', error: error.message });
    }
}

exports.createGame = async (req, res) => {
    try {
            const { title, price, platform } = req.body;
            const newGame = await Game.create({ title, price, platform });
            if (!newGame) return res.status(400).json({ message: 'No se pudo crear el juego' });
            return res.status(201).json({ message: 'Juego creado exitosamente', game: newGame });
        } catch (error) {
            res.status(500).json({ message: 'hubo un error al crear el juego', error: error.message });
        }
}

exports.updateGamebyId = async (req, res) => {
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
}

exports.deleteGameById = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) return res.status(404).json({ message: 'Juego no encontrado' });
        return res.status(200).json({ message: 'Juego eliminado exitosamente', game: deletedGame });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al eliminar el juego', error: error.message });
    }
}