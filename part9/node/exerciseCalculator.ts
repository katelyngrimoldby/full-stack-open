interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (target: number, hours: number[]): Result => {

  const trainingDays = hours.filter(day => day > 0);

  const average = hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / hours.length;

  const rating = average >= target ? 3 : average >= ( target / 2) ?  2 : 1;

  let ratingDescription: string;

  switch (rating) {
    case 3:
      ratingDescription = 'Great job!';
      break;
    case 2:
      ratingDescription = 'Could be better.';
      break;
    case 1: 
    ratingDescription = 'Just bad.';
    break;
    default: 
    throw new Error('Something went wrong.');
  }

  return {
    periodLength: hours.length,
    target,
    trainingDays: trainingDays.length,
    average,
    success: average >= target,
    rating,
    ratingDescription
  };
};

interface ExerciseValues {
  target: number
  hours: number[]
}

const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if(args.length < 4) throw new Error('Missing arguments');

  const parameters = args.slice(2);
  parameters.forEach(param => {
    if(isNaN(Number(param))) {
      throw new Error('One or more arguments are not numbers');
    }
  });

  const numArgs = parameters.map(param => Number(param));

  return {
    target: numArgs[0],
    hours: numArgs.slice(1)
  };
};

try {
  const {target, hours} = parseExerciseArgs(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error) {
  if(error instanceof Error) {
    console.log(error.message);
  }
}