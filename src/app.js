const express = require('express');

const app = express();
app.use(express.json());

const { sayHello, uppercase, lowercase, firstCharacters } = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

app.get('/strings/hello/:string', (req, res) => {
  res.status(200);
  res.send({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200);
  res.send({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200);
  res.send({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const length = req.query.length || 1;
  res.status(200);
  res.send({ result: firstCharacters(req.params.string, length) });
});

// Numbers
app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400);
    res.json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200);
    res.json({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400);
    res.json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200);
    res.json({ result: subtract(a, b) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (!req.body.a || !req.body.b) {
    res.status(400);
    res.json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400);
    res.json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200);
    res.json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (b === 0) {
    res.status(400);
    res.json({ error: 'Unable to divide by 0.' });
  } else if (a === 0) {
    res.status(200);
    res.json({ result: 0 });
  } else if (!req.body.a || !req.body.b) {
    res.status(400);
    res.json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400);
    res.json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200);
    res.json({ result: divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (b === 0) {
    res.status(400);
    res.json({ error: 'Unable to divide by 0.' });
  } else if (a === 0) {
    res.status(200);
    res.json({ result: 0 });
  } else if (!req.body.a || !req.body.b) {
    res.status(400);
    res.json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400);
    res.json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200);
    res.json({ result: remainder(a, b) });
  }
});

module.exports = app;
