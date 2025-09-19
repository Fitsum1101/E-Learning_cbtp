import React, { useState } from "react";
import LessonContext from "./lesson-context";

const LessonContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(undefined);

  return (
    <LessonContext
      value={{ lesson, handleLesson: (lesson) => setLesson(lesson) }}
    >
      {children}
    </LessonContext>
  );
};

export default LessonContextProvider;
