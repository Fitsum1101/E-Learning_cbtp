import { BookOpen, Clock } from "lucide-react";
import React, { useState } from "react";
import CustomizedProgressBars from "../../components/common/progress/LinearProgress";
import Button from "../../components/common/Button/Button";

const mockExamData = {
  courseTitle: "React Fundamentals",
  examTitle: "Final Assessment",
  timeLimit: 30, // minutes
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance of React applications",
        "To handle routing in React applications",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Which hook is used to manage component state in functional components?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What does the useEffect hook do?",
      options: [
        "Manages component state",
        "Handles side effects and lifecycle events",
        "Creates context for components",
        "Optimizes component rendering",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "What is JSX?",
      options: [
        "A new programming language",
        "A JavaScript library",
        "A syntax extension for JavaScript",
        "A CSS framework",
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "How do you pass data from parent to child components?",
      options: ["Using state", "Using props", "Using context", "Using refs"],
      correctAnswer: 1,
    },
  ],
};

const CourseExam = () => {
  const [examState, setExamState] = useState({
    answers: {},
    currentQuestion: 0,
    timeRemaining: mockExamData.timeLimit * 60, // Convert to seconds
    isSubmitted: false,
    showResults: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setExamState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (examState.currentQuestion < mockExamData.questions.length - 1) {
      setExamState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (examState.currentQuestion > 0) {
      setExamState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmitExam = () => {};

  //   useEffect(() => {
  //     if (examState.timeRemaining > 0 && !examState.isSubmitted) {
  //       const timer = setTimeout(() => {
  //         setExamState((prev) => ({
  //           ...prev,
  //           timeRemaining: prev.timeRemaining - 1,
  //         }));
  //       }, 1000);

  //       return () => clearTimeout(timer);
  //     } else if (examState.timeRemaining === 0 && !examState.isSubmitted) {
  //       // Auto-submit when time runs out
  //       handleSubmitExam();
  //     }
  //   }, [examState.timeRemaining, examState.isSubmitted]);

  const currentQuestion = mockExamData.questions[examState.currentQuestion];
  const progress =
    ((examState.currentQuestion + 1) / mockExamData.questions.length) * 100;
  const answeredQuestions = Object.keys(examState.answers).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border mb-6 border-gray-200 shadow shadow-gray-200">
          <div className="flex  my-6 px-6 py-1 bg-blue-100  flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl text-gray-700 font-semibold capitalize">
                Final exam
              </h3>
              <div className="flex items-center  gap-2 text-blue-600">
                <BookOpen className="w-4 h-4 inline-block " />
                <p>React Fundamentals</p>
              </div>
            </div>
            <div className="flex items-center text-blue-500 justify-center gap-5">
              <div className="flex gap-2 justify-center items-center">
                <Clock className="w-4 h-4" />
                <p className="font-semibold">10:40</p>
              </div>
              <p className="text-[13px] rounded-4xl font-semibold border border-gray-40 flex items-center justify-center px-2">
                5/10 answered
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border mb-6  border-gray-200 shadow shadow-gray-200">
          <div className="flex  my-6 px-6 py-2 bg-blue-100  flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex text-md flex-col w-full gap-1">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 font-semibold"> Questions of 1/5</p>
                <p className="text-blue-600">20% complete</p>
              </div>
              <div className="py-1">
                <CustomizedProgressBars value={80} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border mb-6  border-gray-200 shadow shadow-gray-200">
          <div className="my-6 px-6 py-2 bg-blue-100 border-blue-200">
            <div className="text-lg text-balance text-blue-900">
              How do you pass data from parent to child components?
            </div>
          </div>
          <div className="space-y-4 p-4 bg-white">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  examState.answers[currentQuestion.id] === index
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      examState.answers[currentQuestion.id] === index
                        ? "border-blue-600 bg-blue-600"
                        : "border-blue-300"
                    }`}
                  >
                    {examState.answers[currentQuestion.id] === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-pretty text-blue-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border  border-gray-200 shadow shadow-gray-200">
          <div className="border-blue-200">
            <div className="p-4 my-6 bg-blue-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={examState.currentQuestion === 0}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={
                      examState.currentQuestion ===
                      mockExamData.questions.length - 1
                    }
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                  >
                    Next
                  </Button>
                </div>

                <Button
                  onClick={handleSubmitExam}
                  disabled={isLoading}
                  className="sm:ml-auto py-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? "Submitting..." : "Submit Exam"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseExam;

// if (examState.showResults) {
//   const score = calculateScore();
//   return (
//     <div className="min-h-screen bg-white p-4">
//       <div className="max-w-4xl mx-auto">
//         <Card className="mb-6 border-blue-200">
//           <CardHeader className="text-center bg-blue-50">
//             <CardTitle className="text-2xl text-balance text-blue-900">
//               {mockExamData.courseTitle} - Results
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center space-y-6 bg-white">
//             <div className="flex justify-center">
//               {score.percentage >= 70 ? (
//                 <CheckCircle className="h-16 w-16 text-blue-600" />
//               ) : (
//                 <XCircle className="h-16 w-16 text-red-500" />
//               )}
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-3xl font-bold text-blue-900">
//                 {score.percentage}%
//               </h3>
//               <p className="text-blue-700">
//                 {score.correct} out of {score.total} questions correct
//               </p>
//               <Badge
//                 variant={score.percentage >= 70 ? "default" : "destructive"}
//                 className={
//                   score.percentage >= 70 ? "bg-blue-600 hover:bg-blue-700" : ""
//                 }
//               >
//                 {score.percentage >= 70 ? "Passed" : "Failed"}
//               </Badge>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
//               <Card className="border-blue-200">
//                 <CardContent className="p-4 text-center bg-blue-50">
//                   <div className="text-2xl font-bold text-blue-700">
//                     {score.correct}
//                   </div>
//                   <div className="text-sm text-blue-600">Correct</div>
//                 </CardContent>
//               </Card>
//               <Card className="border-blue-200">
//                 <CardContent className="p-4 text-center bg-red-50">
//                   <div className="text-2xl font-bold text-red-600">
//                     {score.total - score.correct}
//                   </div>
//                   <div className="text-sm text-red-500">Incorrect</div>
//                 </CardContent>
//               </Card>
//               <Card className="border-blue-200">
//                 <CardContent className="p-4 text-center bg-blue-50">
//                   <div className="text-2xl font-bold text-blue-700">
//                     {formatTime(
//                       mockExamData.timeLimit * 60 - examState.timeRemaining
//                     )}
//                   </div>
//                   <div className="text-sm text-blue-600">Time Spent</div>
//                 </CardContent>
//               </Card>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Question Review */}
//         <Card className="border-blue-200">
//           <CardHeader className="bg-blue-50">
//             <CardTitle className="text-blue-900">Question Review</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 bg-white">
//             {mockExamData.questions.map((question, index) => {
//               const userAnswer = examState.answers[question.id];
//               const isCorrect = userAnswer === question.correctAnswer;

//               return (
//                 <div
//                   key={question.id}
//                   className="border border-blue-200 rounded-lg p-4 bg-blue-50"
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="flex-shrink-0">
//                       {isCorrect ? (
//                         <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
//                       ) : (
//                         <XCircle className="h-5 w-5 text-red-500 mt-1" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-medium mb-2 text-blue-900">
//                         {index + 1}. {question.question}
//                       </h4>
//                       <div className="space-y-1 text-sm">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex}
//                             className={`p-2 rounded ${
//                               optionIndex === question.correctAnswer
//                                 ? "bg-blue-100 text-blue-800 border border-blue-300"
//                                 : optionIndex === userAnswer && !isCorrect
//                                 ? "bg-red-100 text-red-800 border border-red-300"
//                                 : "bg-white border border-blue-200"
//                             }`}
//                           >
//                             {option}
//                             {optionIndex === question.correctAnswer && (
//                               <span className="ml-2 text-xs font-medium text-blue-700">
//                                 ✓ Correct
//                               </span>
//                             )}
//                             {optionIndex === userAnswer && !isCorrect && (
//                               <span className="ml-2 text-xs font-medium text-red-600">
//                                 ✗ Your answer
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
