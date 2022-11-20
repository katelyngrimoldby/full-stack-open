import Part from "./Part";

const Content = ({content}) => {

  return(
    <div>
      {content.map((item, index) => <Part key={index + Date.now()} content={item} />)}
    </div>
  )
}

export default Content;