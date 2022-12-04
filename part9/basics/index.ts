import express = require('express');
import qs = require('qs');
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use('query parser', ((str: string) => qs.parse(str)));
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(isNaN(height) || isNaN(weight)){
    return res.status(400).json({error: 'Malformatted parameters'});
  } 

  try {
    const result = calculateBmi(height, weight);

    return res.json(result);
  } catch(error) {
    if(error instanceof Error) {
      return res.status(400).json({error: error.message});
    }
    return res.status(500).json({error: 'Something went wrong.'});
  }
});

app.post('/exercise', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const {target, daily_exercises} = req.body;

// validates parameters exist
if(!target || !daily_exercises) {
  return res.status(400).json({error: 'Missing Parameters'});
}

// validates target is a number
if(isNaN(Number(target))) {
  return res.status(400).json({error: 'Malformatted parameters'});
}

//validates daily_exercises is an array
if(Array.isArray(daily_exercises)) {
  // converts all elements to array of numbers
  const hours: number[] = daily_exercises.map((elem: string) => {
    const day = Number(elem);
    return day;
  });

  // Validates all elements are numbers
  hours.forEach((day) =>{
    isNaN(day) && res.status(400).json({error: 'Malformatted parameters'});
  });
    
  try {
    const result = calculateExercises(Number(target), hours);
    return res.json(result);
  } catch(error) {
    if(error instanceof Error) {
      return res.status(400).json({error: error.message});
    }
  } 
}
return res.status(400).json({error: 'Malformatted parameters'});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});