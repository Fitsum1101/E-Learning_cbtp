import Button from "../../components/common/Button/Button";
import QuestionSideBar, {
  questions,
} from "../../components/exam/sidbar/SideBar";

const CourseExam = () => {
  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="flex h-full">
        <QuestionSideBar />
        <div className="flex flex-col flex-1">
          {/* Question Header */}
          <div className="p-6 border-b border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-blue-700">
                Question {1} of {4}
              </h2>
              <span className="text-sm text-blue-600">{60}% complete</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 text-balance">
              Question Content
            </h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl space-y-3">
              {questions[0].options.map((option, index) => (
                <button
                  key={index}
                  // onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    false
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        false === index
                          ? "border-blue-600 bg-blue-600"
                          : "border-blue-300"
                      }`}
                    >
                      {false === index && (
                        <div className="w-full h-full scale-50 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-blue-900 text-pretty">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between max-w-2xl">
              <Button
                variant="outline"
                // onClick={handlePreviousQuestion}
                // disabled={examState.currentQuestion === 0}
                className="py-1 text-blue-700 bg-transparent border-blue-300 hover:bg-blue-100"
              >
                Previous Question
              </Button>

              <Button
                // onClick={handleNextQuestion}
                // disabled={
                //   examState.currentQuestion ===
                //   mockExamData.questions.length - 1
                // }
                className="py-1 text-white bg-blue-600 hover:bg-blue-700"
              >
                Next Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseExam;
