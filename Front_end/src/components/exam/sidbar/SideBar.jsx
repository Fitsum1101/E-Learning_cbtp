import { BookOpen, Clock, Timer, TimerIcon } from "lucide-react";

import LinearProgress from "@mui/material/LinearProgress";
import Button from "../../common/Button/Button";
import Question from "../questions/Questions";
import { useEffect } from "react";

const calcRemaining = (expiryTime) => {
  const now = Date.now();
  const diff = Math.max(0, Math.floor((expiryTime - now) / 1000)); // seconds left
  return diff;
};

const QuestionSideBar = ({
  questions,
  activeQuestion,
  remainingTime,
  handleActiveQuestion,
  percent,
  startsTime,
  onSubmit,
}) => {
  const isAllCourseAnswered =
    questions?.findIndex((que) => !("isAnswered" in que)) !== -1;

  return (
    <div className="flex flex-col justify-between h-full border-r border-blue-200 w-80 bg-blue-50 ">
      <div className="flex flex-col p-4 bg-blue-100">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Final Assessment
        </h3>
        <div
          className={`flex gap-2 text-sm ${
            remainingTime === 0 ? "text-red-700" : "text-blue-600"
          } `}
        >
          <BookOpen className="w-5 h-5 " />
          <p className="items-center capitalize ">reatc fundamental</p>
        </div>
        <div>
          <div className="flex justify-between my-2">
            <p
              className={`flex items-center ${
                remainingTime === 0 ? "text-red-700" : "text-blue-600"
              }} gap-1 text-blue-700`}
            >
              <Clock className="w-4 h-4" />
              {startsTime}
            </p>
            <p className="flex items-center justify-center px-2 text-sm font-medium text-blue-700 border border-blue-400 rounded-lg">
              2/5
            </p>
          </div>
          <LinearProgress
            sx={{
              borderRadius: "1rem",
              padding: "4px",
              backgroundColor: "red",
            }}
            className="text-green-800 bg-green-800"
            variant="determinate"
            value={percent}
          />
        </div>
      </div>
      <div className="px-4 overflow-y-scroll">
        <p className="my-2 font-semibold text-gray-600 text-md">Questions</p>
        <div className="flex flex-col gap-2 ">
          {questions?.map((que, index) => (
            <Question
              key={index}
              isActive={que.id === activeQuestion.id}
              handleSelectedQuestion={() => handleActiveQuestion(que)}
              index={index}
              isAnswered={que.options.findIndex((opt) => opt.isAnswer) !== -1}
              question={que.questionText}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center p-3 mt-2 text-white bg-blue-100 p ">
        <Button
          disabled={isAllCourseAnswered}
          onClick={onSubmit}
          className={`w-full py-1 text-center  bg-blue-600 hover:bg-blue-700 rounded-xl `}
        >
          Submit Exam
        </Button>
      </div>
    </div>
  );
};

export default QuestionSideBar;
