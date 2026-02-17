const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado a la BD Atlas')
    } catch (error) {
        console.error('Error al conectar a la BD', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;