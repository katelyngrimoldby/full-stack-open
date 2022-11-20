const Total = ({parts}) => {
  let totalExercises = 0

  parts.forEach(item => {
    totalExercises += item.exercises
  })

  return <p>Number of exercises: {totalExercises}</p>
}

export default Total;