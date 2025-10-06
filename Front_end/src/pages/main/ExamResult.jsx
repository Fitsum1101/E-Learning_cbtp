import React from "react";
import ExamResultSidbar from "../../components/examresult/Sidbar";
import Overivew from "../../components/examresult/Headers/Overivew";
import Button from "../../components/common/Button/Button";
import {
  BookOpen,
  CheckCircleIcon,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  File,
  FileText,
  FileWarningIcon,
  MailWarningIcon,
} from "lucide-react";
import Analaysis from "../../ui/examresult/Analaysis";

const CardContent = ({ number, text, sucess = true }) => {
  const className = sucess
    ? "text-blue-500 border-blue-500"
    : "text-red-500 border-red-500";
  return (
    <div
      className={` border py-1 bg-white font-semibold  w-full flex flex-col items-center justify-center  rounded-md ${className} `}
    >
      <div
        className={`w-full my-5 text-center ${
          sucess ? "bg-blue-100" : "bg-red-100"
        } `}
      >
        <h3 className="text-xl">{number}</h3>
        <p className="text-sm capitalize">{text}</p>
      </div>
    </div>
  );
};

const ExamResult = () => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between h-full border-r border-blue-200 w-80 bg-blue-50 ">
        <div className="flex flex-col p-4 bg-blue-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <p className="items-center capitalize">reatc fundamental</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 p-4 m-2 bg-white border border-blue-100 rounded-xl">
          <CircleX size={35} className="text-red-500" />
          <h3 className="text-3xl font-semibold text-blue-900 ">60%</h3>
          <p className="text-sm font-semibold text-blue-700">3/5 correct</p>
          <p className="px-2 font-semibold text-white bg-red-600 rounded-sm text-md">
            Failed
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 p-3 border-b border-blue-200">
          <Button className="px-2 py-1 text-blue-600 bg-white border border-blue-500 text-md hover:bg-blue-700 hover:text-white ">
            Overview
          </Button>
          <Button className="px-3 py-1 text-white bg-blue-700 border border-blue-500 ">
            Review
          </Button>
        </div>
        {true && (
          <div className="overflow-y-scroll h-[200px]">
            <div className="flex items-center justify-center gap-2 p-4 ">
              <CardContent number={10} text={"correct"} />
              <CardContent number={3} text={"incorreect"} sucess={false} />
            </div>
            <CardContent number={3} text={"incorreect"} sucess={true} />
          </div>
        )}
        <div className="flex flex-col items-center gap-2 pt-2 mx-2 my-2 border-t border-blue-200">
          <Button className="w-full py-1 text-white bg-blue-700">
            View certifcate
          </Button>
          <Button className="">Print</Button>
        </div>
      </div>
      <div className="w-full">
        <Overivew />
        <div className="grid grid-cols-1 gap-3 m-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 ">
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <FileText size={20} className="mr-2 " />
              <h2 className="text-xl font-semibold">Score Detail</h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-blue-500">
              <QuestionData number={10} text={"Total Questions"} />
              <QuestionData number={5} text={"Correct Answers:"} />
              <QuestionData
                number={5}
                text={"Incorrect Answers:"}
                isCorrect={false}
              />
            </div>
            <div className="flex items-center justify-between p-3 mx-4 my-2 border-t-2 border-blue-200 rounded-lg bg-blue-50">
              <span className="font-semibold text-blue-700">Final Score:</span>
              <span className="text-2xl font-bold text-blue-900">{40}%</span>
            </div>
          </Analaysis>
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <Clock size={20} className="mr-2 " />
              <h2 className="text-xl font-semibold">Time Analysis</h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-blue-500">
              <TimeData text={"Time Limit"} time={"30 min "} />
              <TimeData text={"Time Used"} time={"20 min "} />
              <TimeData text={"Time Remaining"} time={"50 min "} />
            </div>
            <div className="flex items-center justify-between p-3 mx-4 my-2 border-t-2 border-blue-200 rounded-lg bg-blue-50">
              <span className="font-semibold text-blue-700">
                Avg per Question:
              </span>
              <span className="text-2xl font-bold text-blue-900">{40}%</span>
            </div>
          </Analaysis>
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <CircleCheck size={20} className="mr-2 " />
              <h2 className="text-xl font-semibold">Next steps</h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-blue-500">
              <NextStep isError={true} text={"Review incorrect answers"} />
              <NextStep isError={true} text={"Study course materials"} />
              <NextStep isError={true} text={"Retake when ready"} />
            </div>
          </Analaysis>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;

const QuestionData = ({ text, number, isCorrect = true }) => {
  const className = isCorrect ? "hover:bg-red-50 " : "hover:bg-red-50";
  return (
    <div
      className={`flex justify-between w-full p-2 transition duration-200 ease-in-out rounded-md ${className} `}
    >
      <p>{text}:</p>
      <span
        className={`font-semibold ${
          isCorrect ? "text-gray-950" : "text-red-500"
        }`}
      >
        {number}
      </span>
    </div>
  );
};

const TimeData = ({ text, time }) => {
  return (
    <div
      className={`flex justify-between text-blue-600 w-full p-2 transition duration-200 ease-in-out rounded-md `}
    >
      <p>{text}:</p>
      <span className="text-gray-950">{time}</span>
    </div>
  );
};

const NextStep = ({ isError, text }) => {
  const className = isError
    ? "text-red-500 hover:bg-red-50"
    : "text-blue-500 hover:bg-blue-50";
  return (
    <div
      className={`flex gap-4 w-full p-1 items-center transition duration-200 ease-in-out rounded-md ${className}`}
    >
      {isError ? <CircleAlert size={20} /> : <CheckCircleIcon size={20} />}
      <p>{text}</p>
    </div>
  );
};
