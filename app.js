const express = require("express");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const { projects } = ("./data.json");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//View engine is Pug
app.set("view engine", "pug");

//Static middleware to serve static files
app.use('/static', express.static('public'));

//Home page route
app.get('/', (req, res, next) => {
    //log out the home route handler
    //pass the project data into the index template
    res.render('index', { projects });
});

//About page route
app.get('/about', (req, res, next) => {
    res.render('about');
});

//Project route
app.get('/project/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = projects.projectId;

    if (Number.isInterger(projectId) && projectId <= projects.length && projectId >= 0) {
        return res.render('project', { project });
    } else {
        let err = new Error("Sorry, that page does not exist.");
        next(err);
    }
});

//catch a 404 error and send to error middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
});

//Global error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }
    res.status(err.status);
    res.render('Oops! Something went wrong. Please try again.');
});

//server listen for the app
app.listen(3000, () => {
    console.log('The app is listening on port: 3000');
});

module.exports = app;