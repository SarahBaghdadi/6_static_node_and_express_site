const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
const data = require('./data.json');

app.get('/', (req, res) => {
    res.locals = data.projects;
    const projects = data.projects;
    res.render('index', {projects: projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get(`/projects/:id`, (req, res, next) => {
    const id = req.params.id;
    const project = data.projects[id];
    if (!project) {
        const err = new Error;
        err.status = 404;
        err.message = `Project ${id} does not exist.`;
        next(err);
    }
    res.render('project', project);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error;
    err.status = 404;
    err.message = 'Page Not Found';
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    if (err) {
        if (err.status == 404) {
            res.status(404);
        } else {
            err.message = err.message || 'Something went wrong.';
            err.status = err.status || 500;
        }
        console.log(`Global error handler called. Status: ${err.status}. Message: ${err.message}.`);
        res.render('error', {err});
    }
});

app.listen(3000, () => {
    console.log('App is running on 3000!');
});