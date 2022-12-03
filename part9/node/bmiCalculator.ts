interface BmiResult {
  height: number
  weight: number
  bmi: string
}

const calculateBmi = (height: number, weight: number): BmiResult => {
  const h = height / 100;

  const result = Math.round((weight / (h * h)) * 10) / 10

  let bmi: string;

  switch(true) {
    case (result < 16): 
      bmi = 'Underweight (Severe thinness)'
      break;
    case (result >= 16 && result <= 16.9): 
      bmi = 'Underweight (Moderate thinness)'
      break;
    case (result >= 17 && result <= 18.4):
      bmi = 'Underweight (Mild thinness)'
      break;
    case (result >= 18.5 && result <= 24.9):
      bmi = 'Normal Range'
      break;
    case (result >= 25 && result <= 29.9):
      bmi = 'Overweight (Pre-obese)'
      break;
    case (result >= 30 && result <= 34.9):
      bmi = 'Obese (Class I)'
      break;
    case (result >= 35 && result <= 39.9):
      bmi = 'Obese (Class II)'
      break;
    case (result >= 40):
      bmi = 'Obese (Class III)'
      break;
    default: 
      throw new Error('What went wrong??')
  }

  return {
    weight,
    height,
    bmi
  }
}

// interface BmiValues {
//   height: number
//   weight: number
// }

// const parseBmiArgs = (args: string[]): BmiValues => {
//   if(args.length < 4) throw new Error('Missing arguments')
//   if(args.length > 4) throw new Error('Too many arguments')

//   const parameters = args.slice(2)
//   parameters.forEach(param => {
//     if(isNaN(Number(param))) {
//       throw new Error('One or more arguments are not numbers')
//     }
//   })

//   return {
//     height: Number(args[2]),
//     weight: Number(args[3])
//   }
// }
// try {
//   const {height, weight} = parseBmiArgs(process.argv)
//   console.log(calculateBmi(height, weight))
// } catch(err) {
//   if(err instanceof Error) {
//     console.log(err.message)
//   }
// }

export default calculateBmi