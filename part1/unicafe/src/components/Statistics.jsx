import Statistic from "./Statistic"

const Statistics = ({good, neutral, bad}) => {
  const getAverage = (good, neutral, bad) => {
    return (good + (bad * -1)) / (good + neutral + bad)
  }

  const getPositive = (good, neutral, bad) => {
    return (good / (good + neutral + bad)) * 100
  }

  if(good > 0 || neutral > 0 || bad > 0) {
    return(
      <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="Total" value={good + bad + neutral} />
            <Statistic text="Average" value={getAverage(good, neutral, bad)} />
            <Statistic text="Positive" value={`${getPositive(good, neutral, bad)}%`} />
          </tbody>
        </table>
    )
  } else {
    return <p>No feedback given</p>
  }
  
}

export default Statistics;