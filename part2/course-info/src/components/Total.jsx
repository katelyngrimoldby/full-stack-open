const Total = ({parts}) => {
  const totalExercises = parts.reduce((accumulator, currentValue) =>{ 
    return accumulator + currentValue.exercises
  }, 0)

  return <p>Number of exercises: {totalExercises}</p>
}

export default Total;