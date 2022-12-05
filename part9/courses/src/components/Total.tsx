import { CourseContents } from "../types";

const Total = ({parts}: {parts: CourseContents}) => {
  const totalExercises = parts[0].exerciseCount + parts[1].exerciseCount + parts[2].exerciseCount

  return <p>Number of exercises: {totalExercises}</p>
}

export default Total;
