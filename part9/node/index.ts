import express = require('express');
import qs = require('qs');
import calculateBmi from './bmiCalculator';

const app = express();

app.use('query parser', ((str: string) => qs.parse(str)));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(isNaN(height) || isNaN(weight)) res.status(400).json({error: 'Malformatted parameters'});

  try {
    const result = calculateBmi(height, weight);

    res.json(result);
  } catch(error) {
    if(error instanceof Error) {
      res.status(400).json({error: error.message});
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});