import Course from "./components/Course"


function App() {
  const courses = [
    {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}
    ]
  }, 
  {
    name: 'Node.js',
    parts: [
      {name: 'Routing', exercises: 3},
      {name: 'Middlewares', exercises: 7}
    ]
  }
]
  return (
    <div className="App">
     {courses.map((course, index) => <Course key={index + Date.now()} course={course} />)}
    </div>
  )
}

export default App
