  const express = require('express');
  const fs = require('fs');
  const bodyParser = require('body-parser');

  const app = express();

  // const loginRoutes = require('./routes/login');
  // const messageRoutes = require('./routes/message');

  app.use(bodyParser.urlencoded({ extended: false }));


  // app.use('/login', loginRoutes);
  // app.use('/message', messageRoutes);
  
app.get('/',(req, res) => {
  res.send(`<form action="/" onSubmit= "document.getElementById('username').value=localStorage.getItem('username')" method="POST">
  <input type="text" id="message" name="message" placeholder="message">
  <input type="hidden" name="username" id="username">
  <br>
  <button type="submit">send</button></form>`
  );
});

app.post('/', (req, res) => {
  
  console.log(req.body.username + ":"+ req.body.message );

  fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, (err) =>
    err ? console.log(err) :  res.redirect("/")
  );
});

  app.get('/login', (req, res) => {
    res.send(`<form action="/login" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"
    method="POST">
    <input id="username" type="text" name="username" placeholder="Enter your username">
    <button type="submit">Login</button>
    </form>`);
 });

app.post('/login', (req, res) => {
    const { username } = req.body;
    res.redirect('/');
});


  app.use((req, res, next) => {
      res.status(404).send('<h1>Page not found</h1>');
    });

  app.listen(5000, () => {
      console.log('Server is running on port 5000.');
  });