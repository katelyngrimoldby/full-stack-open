import { ContentPart } from "../types";

const Part = ({content}: {content: ContentPart}) => {
  return <p>{content.name} {content.exerciseCount}</p>
}

export default Part;