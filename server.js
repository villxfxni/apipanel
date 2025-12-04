const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let latestReading = null;

app.post('/api/solar', (req, res) => {
  const { voltage } = req.body;

  if (typeof voltage !== 'number' || isNaN(voltage)) {
    return res.status(400).json({ error: 'El voltaje debe ser un numero' });
  }

  latestReading = {
    voltage,
    receivedAt: new Date().toISOString()
  };

  console.log('New reading:', latestReading);
  res.status(201).json({ ok: true });
});

app.get('/api/solar/latest', (req, res) => {
  if (!latestReading) {
    return res.status(404).json({ error: 'No hay lecturas' });
  }
  res.json(latestReading);
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Apipanel listening on ${port}`);
});
