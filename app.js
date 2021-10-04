//required modules
const express = require('express');
const pug = require('pug');
const path = require('path');
//require http module for status codes
const http = require('http');
const data = require('./data.json');
const project = require('./project');

const app = express();

//set pug
app.set('view engine', 'pug');

//static middleware
app.use('/static', express.static(path.join(__dirname, 'public')));

console.log("Hello World!");
console.error("Oops!");

http.get('http://localhost:3000/data.json', response => {
    console.log(response.statusCode);
});

//establish the root route
app.get('/', (req, res) => {
    res.render('index');
});

//establish the about page
app.get('/about', (req, res) => {
    res.render('about');
});


//establish the project page
app.get('/projects/:id', (req, res, next) => {
    res.render('project', data);
    next(data);
});


//check to see if app is listening
app.listen(3000, function() {
    console.log('The app is listening on port: 3000');
});