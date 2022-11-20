import { useState } from 'react'
import Statistics from './components/Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="App">
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <div>
        <button onClick={() => {
          setGood(good + 1)
        }}>Good</button>
        <button onClick={() => {
          setNeutral(neutral + 1)
        }}>Neutral</button>
        <button onClick={() => {
          setBad(bad + 1)
        }}>Bad</button>
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
