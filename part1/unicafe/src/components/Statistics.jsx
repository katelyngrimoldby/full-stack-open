const Statistics = ({good, neutral, bad}) => {
  const getAverage = (good, neutral, bad) => {
    return (good + (bad * -1)) / (good + neutral + bad)
  }

  const getPositive = (good, neutral, bad) => {
    return (good / (good + neutral + bad)) * 100
  }

  return(
    <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {good + bad + neutral}</p>
        <p>Average: {getAverage(good, neutral, bad)}</p>
        <p>Positive: {getPositive(good, neutral, bad)}%</p>
      </div>
  )
}

export default Statistics;