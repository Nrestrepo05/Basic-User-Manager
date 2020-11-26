/* eslint-disable radix */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    id: 1, name: 'user1', lastName: 'user2',
  },
  {
    id: 2, name: 'user2', lastName: 'user2',
  },
  {
    id: 3, name: 'user3', lastName: 'user3',
  },
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);

  res.json(user);
});

app.get('/api/users/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  const user = users[index];
  res.json(user);
});

app.patch('/api/users/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  const user = users[index];
  if ('name' in req.body) user.name = req.body.name;
  if ('lastName' in req.body) user.lastName = req.body.lastName;

  res.json(user);
});

app.listen(9001, () => {
  console.log('Node server started on port 9001.');
});
