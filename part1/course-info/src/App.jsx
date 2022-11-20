import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"


function App() {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div className="App">
     <Header course={course} />
     <Content content={parts} />
     <Total parts={parts} />
    </div>
  )
}

export default App
