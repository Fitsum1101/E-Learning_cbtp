import Overivew from "../../components/examresult/Headers/Overivew";
import Button from "../../components/common/Button/Button";
import {
  BookOpen,
  CheckCircleIcon,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  FileText,
} from "lucide-react";
import Analaysis from "../../ui/examresult/Analaysis";
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { formatTime } from "../../hooks/useLearningTimer";

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
  const params = useParams();

  let time = {};

  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: ["result", params.id],
    queryFn: ({ queryKey }) => api.get(`/api/exam/${queryKey[1]}/result`),
    select: (response) => response?.data?.data,
  });

  const isFailed = data?.status === "FAILED";

  if (isSuccess) {
    time.timeLimit = formatTime(data?.timeLimit);
    time.usedTime = formatTime(data?.usedTime);
    time.remainTime = formatTime(data?.remainTime);
  }

  if (isLoading) {
    <h1>LOADING .........</h1>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col justify-between h-full border-r border-blue-200 w-80 bg-blue-50 ">
        <div className="flex flex-col p-4 bg-blue-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <p className="items-center capitalize">reatc fundamental</p>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-1 p-4 m-2 ${
            data?.status === "FAILED" ? "bg-red-200" : "bg-green-200"
          }  border border-blue-100 rounded-xl`}
        >
          <CircleX size={35} className="text-red-500" />
          <h3 className="t~ext-3xl font-semibold text-red-900 ">
            {data?.scorePercentage}%
          </h3>
          <p className="text-sm font-semibold text-red-700">
            {data?.correctAnswer}/{data?.totalQuestions} correct
          </p>
          <p
            className={`px-2 font-semibold text-white ${
              isFailed ? "bg-red-600" : "bg-green-600"
            }  rounded-sm text-md`}
          >
            {isFailed ? "failed" : "pass"}
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
        <div className="flex flex-col items-center gap-2 pb-2 mx-2 my-2 border-t border-blue-200">
          <Button
            className={`w-full py-1 border ${
              !isFailed
                ? "text-green-900  border-green-400 hover:bg-green-400"
                : "text-red-900  border-red-400 hover:bg-red-400"
            } `}
          >
            Print Resul
          </Button>
        </div>
      </div>
      <div className="flex-1 h-[80vh]  mx-0 mb-10 overflow-y-scroll">
        <Overivew />
        <div className="grid grid-cols-1 gap-3 mx-5 my-5 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 ">
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <FileText size={20} className="mr-2 " />
              <h2 className="mb-1 text-lg font-bold text-gray-600">
                Score Detail
              </h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-gray-700">
              <QuestionData
                isTotalQuestions={true}
                number={data?.totalQuestions}
                text={"Total Questions"}
              />
              <QuestionData
                number={data?.correctAnswer}
                text={"Correct Answers:"}
              />
              <QuestionData
                number={data?.wrongAnswer}
                text={"Incorrect Answers:"}
                isCorrect={false}
              />
            </div>
            <div
              className={`flex items-center justify-between p-3 mx-4 my-2 border-t-2   ${
                !isFailed
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              } rounded-lg `}
            >
              <span
                className={`font-semibold ${
                  !isFailed ? "text-green-700" : "text-red-700"
                } `}
              >
                Final Score:
              </span>
              <span
                className={`text-2xl font-bold ${
                  !isFailed ? "text-green-900" : "text-red-900"
                } `}
              >
                {data?.scorePercentage}%
              </span>
            </div>
          </Analaysis>
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <Clock size={20} className="mr-2" />
              <h2 className="mb-1 text-lg font-bold text-gray-600">
                Time Analysis
              </h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-gray-700">
              <TimeData text={"Time Limit"} time={`${time?.timeLimit} min`} />
              <TimeData text={"Time Used"} time={`${time?.usedTime} min`} />
              <TimeData
                text={"Time Remaining"}
                time={`${time?.remainTime} min`}
              />
            </div>
            <div className="flex items-center justify-between p-3 mx-4 my-2 border-t-2 border-blue-200 rounded-lg bg-blue-50">
              <span className="font-semibold text-blue-700">
                Avg per Question: {data?.rate} per minute
              </span>
              {/* <span className="text-xl font-bold text-blue-900">
                {data?.rate} per minute
              </span> */}
            </div>
          </Analaysis>
          <Analaysis>
            <div className="flex items-center w-full px-5 py-2 mt-4 bg-blue-100 text-blue-950">
              <CircleCheck size={20} className="mr-2 " />
              <h2 className="mb-1 text-lg font-bold text-gray-600">
                Next steps
              </h2>
            </div>
            <div className="flex flex-col gap-3 p-5 mt-8 font-medium text-blue-500">
              <NextStep isError={true} text={"Review incorrect answers"} />
              <NextStep isError={true} text={"Study course materials"} />
              <NextStep isError={true} text={"Retake when ready"} />
            </div>
          </Analaysis>
        </div>
        <div className="mx-5">
          <Analaysis>
            <div className="my-4 bg-blue-100 rounded-md">
              <p className="px-4 mb-1 text-lg font-bold text-gray-600">
                Performance Insights
              </p>
            </div>
            <div className="flex flex-col gap-1 px-4 py-1">
              <div className="flex justify-between font-semibold text-md">
                <p className="text-blue-600">Overall Performance</p>
                <span>60%</span>
              </div>
              <LinearProgress
                sx={{ borderRadius: "5px", height: "10px" }}
                variant="buffer"
                color="success"
                value={90}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-4 md:flex-row">
              <CardContent number={2} text={"Questions Corret"} />
              <CardContent
                sucess={false}
                number={3}
                text={"Questions Missed"}
              />
            </div>
          </Analaysis>
        </div>
        <div className="flex flex-col items-center m-5">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/dofqz9ryj/image/upload/v1759878704/certificates/certificate-Test-User.png"
              }
              alt="Certificate"
              style={{
                maxWidth: "100%", // responsive width
                height: "auto", // maintain aspect ratio
                border: "2px solid #ccc", // optional border
                borderRadius: "10px", // rounded corners
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)", // subtle shadow
              }}
            />
          </div>

          {/* Download button */}
          <a
            // href={certificateUrl}
            download
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;

const QuestionData = ({
  text,
  number,
  isCorrect = true,
  isTotalQuestions = false,
}) => {
  const className = isCorrect
    ? isTotalQuestions
      ? "hover:bg-blue-50 "
      : "hover:bg-green-50 "
    : "hover:bg-red-50";
  return (
    <div
      className={`flex justify-between w-full p-2 transition duration-200 ease-in-out rounded-md ${className} `}
    >
      <p>{text}:</p>
      <span
        className={`font-semibold ${
          isCorrect
            ? isTotalQuestions
              ? "text-blue-500"
              : "text-green-500"
            : "text-red-500"
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
      className={`flex justify-between hover:bg-gray-100 w-full p-2 transition duration-200 ease-in-out rounded-md `}
    >
      <p>{text}:</p>
      <span className="text-gray-950 ">{time}</span>
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
