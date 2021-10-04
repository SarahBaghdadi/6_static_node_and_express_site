const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
const data = require('./data.json');

app.get('/', (req, res) => {
    res.locals = data.projects;
    const projects = data.projects;
    console.log('navigated to index');
    res.render('index', {projects: projects});
});

app.get('/about', (req, res) => {
    console.log('navigated to about');
    res.render('about');
});

app.get(`/projects/:id`, (req, res) => {
    const id = req.params.id;
    const project = data.projects[id];
    console.log('navigated to project');
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
            err.mesage = err.message || 'Something went wrong.';
            res.status(err.status || 500);
        }
        console.log(`Global error handler called. Status: ${err.status}. Message: ${err.message}.`);
        res.render('error', {err});
    }
});

app.listen(3000, () => {
    console.log('App is running on 3000!');
});