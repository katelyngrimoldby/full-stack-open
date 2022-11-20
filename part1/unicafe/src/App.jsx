import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="App">
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <div>
        <Button text="Good" handleClick={() => setGood(good +1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral +1)} />
        <Button text="Bad" handleClick={() => setBad(bad +1)} />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
