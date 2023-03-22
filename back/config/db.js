const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI, () => console.log('Connexion à la BDD réussie !'));
    } catch (error) {
        console.log(error);
        process.exit();
    }

}

module.exports = connectDB;