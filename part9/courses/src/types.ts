interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNonProjectPart extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseNonProjectPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseNonProjectPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseNonProjectPart {
  type: 'special'
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;