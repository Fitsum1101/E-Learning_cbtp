import { BookOpen, TimerIcon } from "lucide-react";
import { Question } from "../questions/Questions";
import { useState } from "react";
import Button from "../../common/Button/Button";
import CustomizedProgressBars from "../../common/progress/LinearProgress";
import LinearProgress from "@mui/material/LinearProgress";

export const questions = [
  {
    id: "q1",
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
  },
  {
    id: "q2",
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
  },
  {
    id: "q3",
    text: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
  },
  {
    id: "q4",
    text: "Which is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
  },
  {
    id: "q5",
    text: "Which language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
  },
];

const QuestionSideBar = () => {
  const [activQuestionIndex, setActiveCourseIndex] = useState(0);
  const QuestionsCollections = questions.map((que) => que.text);

  return (
    <div className="flex flex-col justify-between h-full border-r border-blue-200 w-80 bg-blue-50 ">
      <div className="flex flex-col p-4 bg-blue-100">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Final Assessment
        </h3>
        <div className="flex gap-2 text-sm text-blue-600">
          <BookOpen className="w-5 h-5 " />
          <p className="items-center capitalize ">reatc fundamental</p>
        </div>
        <div>
          <div className="flex justify-between my-2">
            <p className="flex items-center gap-1 text-blue-700">
              <TimerIcon className="w-4 h-4" />
              28:10
            </p>
            <p className="flex items-center justify-center px-2 text-sm font-medium text-blue-700 border border-blue-400 rounded-lg">
              2/5
            </p>
          </div>
          <LinearProgress
            sx={{ borderRadius: "1rem", padding: "4px" }}
            color="primary"
            variant="determinate"
            value={20}
          />
        </div>
      </div>
      <div className="px-4 overflow-y-scroll">
        <p className="my-2 font-semibold text-gray-600 text-md">Questions</p>
        <div className="flex flex-col gap-2 ">
          {QuestionsCollections.map((que, index) => (
            <Question
              key={index}
              isActive={index === activQuestionIndex}
              handleSelectedQuestion={() => setActiveCourseIndex(index)}
              index={index}
              isAnswered={undefined}
              question={que}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center p-3 mt-2 text-white bg-blue-100 p ">
        <Button className="w-full py-1 text-center bg-blue-600 hover:bg-blue-700 rounded-xl">
          Submit Exam
        </Button>
      </div>
    </div>
  );
};

export default QuestionSideBar;
