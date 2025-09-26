import { useState } from "react";
import LessonContext from "./course-context";

const CourseContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(undefined);
  const [course, setCourse] = useState(undefined);
  const [examId, setExamId] = useState(undefined);

  return (
    <LessonContext
      value={{
        lesson,
        course,
        examId,
        handleCourse: (course) => setCourse(course),
        handleLesson: (lesson) => setLesson(lesson),
        handleExamId: (lesson) => setExamId(lesson),
      }}
    >
      {children}
    </LessonContext>
  );
};

export default CourseContextProvider;
