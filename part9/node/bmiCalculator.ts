const calculateBmi = (height: number, weight: number): string => {
  const h = height / 100;

  const result = Math.round((weight / (h * h)) * 10) / 10

  switch(true) {
    case (result < 16): 
      return 'Underweight (Severe thinness)'
    case (result >= 16 && result <= 16.9): 
      return 'Underweight (Moderate thinness)'
    case (result >= 17 && result <= 18.4):
      return 'Underweight (Mild thinness)'
    case (result >= 18.5 && result <= 24.9):
      return 'Normal Range'
    case (result >= 25 && result <= 29.9):
      return 'Overweight (Pre-obese)'
    case (result >= 30 && result <= 34.9):
      return 'Obese (Class I)'
    case (result >= 35 && result <= 39.9):
      return 'Obese (Class II)'
    case (result >= 40):
      return 'Obese (Class III)'
    default: 
      throw new Error('What went wrong??')
  }
}

interface BmiValues {
  height: number
  weight: number
}

const parseBmiArgs = (args: string[]): BmiValues => {
  if(args.length < 4) throw new Error('Missing arguments')
  if(args.length > 4) throw new Error('Too many arguments')

  const parameters = args.slice(2)
  parameters.forEach(param => {
    if(isNaN(Number(param))) {
      throw new Error('One or more arguments are not numbers')
    }
  })

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  }
}
try {
  const {height, weight} = parseBmiArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch(err) {
  if(err instanceof Error) {
    console.log(err.message)
  }
}
