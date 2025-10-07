import { Award, GraduationCap } from "lucide-react";
import React from "react";

const Overivew = ({}) => {
  return (
    <div className="w-full p-10 bg-blue-50">
      <div className="flex items-center gap-2">
        <Award className="w-8 h-8 text-green-600" />
        <h1 className="mb-1 text-3xl font-bold text-gray-600">
          Congratulations! You've completed the exam
        </h1>
      </div>
      <p className="text-lg font-medium text-red-600">
        You've successfully passed the exam with flying colors!
      </p>
    </div>
  );
};

export default Overivew;
