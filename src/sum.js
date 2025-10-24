const express = require('express');
const app = express();
app.use(express.json());

let calculations = [];
let nextId = 1;

function compute(op, a, b) {
  const x = Number(a);
  const y = Number(b);
  if (Number.isNaN(x) || Number.isNaN(y)) throw new Error('invalid numbers');
  switch (op) {
    case 'add': return x + y;
    case 'subtract': return x - y;
    case 'multiply': return x * y;
    default: throw new Error('unsupported operation');
  }
}

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  try {
    const result = compute('add', a, b);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  try {
    const result = compute('subtract', a, b);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  try {
    const result = compute('multiply', a, b);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/calculations', (req, res) => {
  const { op, a, b } = req.body;
  try {
    const result = compute(op, a, b);
    const calc = { id: nextId++, op, a: Number(a), b: Number(b), result };
    calculations.push(calc);
    res.status(201).json(calc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/calculations/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = calculations.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  calculations.splice(idx, 1);
  res.status(204).send();
});

function resetStore() {
  calculations = [];
  nextId = 1;
}

module.exports = { app, resetStore };
