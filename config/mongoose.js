//configuring mongo db
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to mongo DB'));

db.once('open', () => {
    console.log('Database connected!');
});

module.exports = db;