import { useState } from "react";
import LessonContext from "./course-context";

const CourseContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(undefined);
  const [course, setCourse] = useState(undefined);

  return (
    <LessonContext
      value={{
        lesson,
        course,
        handleCourse: (course) => setCourse(course),
        handleLesson: (lesson) => setLesson(lesson),
      }}
    >
      {children}
    </LessonContext>
  );
};

export default CourseContextProvider;
