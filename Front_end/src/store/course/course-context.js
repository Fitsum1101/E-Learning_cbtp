import { createContext, use } from "react";

const CourseContext = createContext({
  lesson: undefined,
  course: undefined,
  handleLesson: () => {},
  handleCourse: () => {},
});

export default CourseContext;

export const useCourseContext = () => use(CourseContext);
