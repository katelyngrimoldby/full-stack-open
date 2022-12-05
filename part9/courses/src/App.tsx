import Header from "./components/Header"
import Content from "./components/Content";
import Total from "./components/Total";


function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div className="App">
     <Header course={courseName} />
     <Content content={courseParts} />
     <Total parts={courseParts} />
    </div>
  )
}

export default App

