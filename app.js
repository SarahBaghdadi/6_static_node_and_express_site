const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
const data = app.use(express.static('data.json'));

app.get('/', (req, res) => {
    res.locals = data.projects;
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// app.get(`/projects/:id`, (req, res) => {
//     res.render(`/projects/${id}`);
// });

app.listen(3000, () => {
    console.log('App is running on 3000!');
});