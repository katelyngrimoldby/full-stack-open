import Part from "./Part";

const Content = ({content}) => {

  return(
    <div>
      <Part content={content[0]} />
      <Part content={content[1]} />
      <Part content={content[2]} />
    </div>
  )
}

export default Content;