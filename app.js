const express = require("express");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const { projects } = ("./data.json");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//View engine is Pug
app.set("view engine", "pug");

//Static middleware to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//Home page route
app.get('/', function(req, res, next) {
    //log out the home route handler
    //pass the project data into the index template
    res.render('index', { projects });
});

//About page route
app.get('/about', function(req, res, next) {
    res.render('about');
});

//Project route
app.get('/project/:id', function(req, res, next) {
    const projectId = parseInt(req.params.id);
    const project = projects.projectId;

    if (Number.isInterger(projectId) && projectId <= { projects }.length && projectId >= 0) {
        return res.render('project', { project });
    } else {
        let err = new Error("Sorry, that page does not exist.");
        next(err);
    }
});

//404 handler to catch undefined route reqs
app.use((req, res, next) => {

    console.log('404 error handler called');
    res.status(404).render('not-found');
});

/* Global error handler */
app.use((err, req, res, next) => {

    if (err) {
        console.log('Global error handler called', err);
    }

    if (err.status === 404) {
        res.status(404).render('not-found', { err });
    } else {
        err.message = err.message || `Oops!  It looks like something went wrong with the server.`;
        res.status(err.status || 500).render('error', { err });
    }
});


//server listen for the app
app.listen(3000, function() {
    console.log('The app is listening on port: 3000');
});

module.exports = app;