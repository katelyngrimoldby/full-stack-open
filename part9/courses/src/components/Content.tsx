import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({content}: {content: CoursePart[]}) => {

  return(
    <div>
      {content.map((element) => <Part content={element} key={element.name} />)}
    </div>
  )
}

export default Content;