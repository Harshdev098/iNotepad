const mongoose = require('mongoose');
const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to MongoDB database")
    });
}

module.exports=connectToMongo