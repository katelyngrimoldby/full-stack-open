import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({content}: {content: CoursePart}) => {
  switch (content.type) {
    case 'normal':
      return(
        <div>
          <h2>{content.name}: {content.exerciseCount}</h2>
          <p>{content.description}</p>
        </div>
      )
    case 'groupProject':
      return(
        <div>
          <h2>{content.name}: {content.exerciseCount}</h2>
          <p>{content.groupProjectCount} projects</p>
        </div>
      )
    case 'submission':
      return(
        <div>
          <h2>{content.name}: {content.exerciseCount}</h2>
          <p>{content.description}</p>
          <a href={content.exerciseSubmissionLink}>Submission Link</a>
        </div>
      )
    case 'special':
      return(
        <div>
          <h2>{content.name}: {content.exerciseCount}</h2>
          <p>{content.description}</p>
          <ul>
            {content.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </div>
      )
    default:
        return assertNever(content)
  }
}

export default Part;