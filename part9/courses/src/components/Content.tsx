import Part from "./Part";
import { CourseContents } from "../types";

const Content = ({content}: {content: CourseContents}) => {

  return(
    <div>
      <Part content={content[0]} />
      <Part content={content[1]} />
      <Part content={content[2]} />
    </div>
  )
}

export default Content;