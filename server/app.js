var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// mongoose setup 

const mongoose = require('mongoose');
const dev_db_url = process.env.DB_URL;
mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


// middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/kanji', indexRouter);
app.use('/users', usersRouter);

// Serve frontend 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    ))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

module.exports = app;
