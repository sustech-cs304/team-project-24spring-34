const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123qweasd',
  database: 'cs304_project',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'Login successful' });
    } else {
      res.send({ message: 'Login failed' });
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
    if (error) throw error;
    res.send({ message: 'User registered' });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));