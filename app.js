const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
const data = require('./data.json');

app.get('/', (req, res) => {
    res.locals = data.projects;
    const projects = data.projects;
    console.log(projects);
    res.render('index', {projects: projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get(`/projects/:id`, (req, res) => {
    const id = req.params.id;
    const project = data.projects[id];
    res.render('project', project);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error;
    err.status = 404;
    err.message = 'Page Not Found';
    next(err);
  });
  
  // error handlers
  
  app.use((err, req, res, next) => {
    if (!err.status) { 
        err.status = 500;
    };
    if (!err.message) {
        err.message = 'Internal Server Error'; 
    };
    console.log(`Error status is ${err.status} and message is ${err.message}.`);
    res.render('error', {
      message: err.message,
      status: err.status,
      error: {}
    });
  });
  

app.listen(3000, () => {
    console.log('App is running on 3000!');
});