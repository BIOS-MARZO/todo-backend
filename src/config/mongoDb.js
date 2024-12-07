require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI
const mongoose = require('mongoose');

const connectMongoDb = async () => {
    console.log('MONGO_URI', MONGO_URI)
    try {
        mongoose.connect(MONGO_URI)

        console.log('Conectado a MongoDB')
    } catch (error) {
        console.error('Error al conectar a MongoDB :', error)
        process.exit(1);
    }
}

module.exports = {
    connectMongoDb,
}