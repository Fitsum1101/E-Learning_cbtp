import { createContext, use } from "react";

const LessonContext = createContext({
  lesson: undefined,
  handleLesson: () => {},
});

export default LessonContext;

export const useLessonContext = () => use(LessonContext);
