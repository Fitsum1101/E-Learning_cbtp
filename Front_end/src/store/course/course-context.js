import { createContext, use } from "react";

const CourseContext = createContext({
  lesson: undefined,
  course: undefined,
  examId: undefined,
  handleLesson: () => {},
  handleCourse: () => {},
  handleExamId: () => {},
});

export default CourseContext;

export const useCourseContext = () => use(CourseContext);
