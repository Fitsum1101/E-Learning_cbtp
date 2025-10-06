import { BookOpen, CircleX, X } from "lucide-react";
import Button from "../../components/common/Button/Button";
import React from "react";

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

const ExamResultSidbar = () => {
  return (
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
      <div className="flex flex-col items-center gap-2 my-2 border-t pt-2 border-blue-200 mx-2">
        <Button className="bg-blue-700 text-white w-full py-1">
          View certifcate
        </Button>
        <Button className="">Print</Button>
      </div>
    </div>
  );
};

export default ExamResultSidbar;
