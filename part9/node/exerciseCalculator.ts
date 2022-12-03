interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {

  const trainingDays = hours.filter(day => day > 0)

  const average = hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / hours.length

  const rating = average >= target ? 3 : average >= ( target / 2) ?  2 : 1

  let ratingDescription: string;

  switch (rating) {
    case 3:
      ratingDescription = 'Great job!'
      break;
    case 2:
      ratingDescription = 'Could be better.'
      break;
    case 1: 
    ratingDescription = 'Just bad.'
    break;
    default: 
    throw new Error('Something went wrong.')
  }

  return {
    periodLength: hours.length,
    target,
    trainingDays: trainingDays.length,
    average,
    success: average >= target,
    rating,
    ratingDescription
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1))
} catch (error) {
  if(error instanceof Error) {
    console.log(error.message)
  }
}