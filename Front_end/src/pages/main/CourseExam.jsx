import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import QuestionSideBar from "../../components/exam/sidbar/SideBar";
import { useLearningTimer } from "../../hooks/useLearningTimer";
import Button from "../../components/common/Button/Button";
import api from "../../services/api";

const CourseExam = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const [questions, setQuestions] = useState(undefined);
  const [time, setTime] = useState(0);

  const params = useParams();

  const { data, isSuccess, error } = useQuery({
    queryKey: ["questions", params.id],
    queryFn: ({ queryKey }) =>
      api.get(`/api/exam/${queryKey[1]}/session/current`),
    select: (response) => {
      const questionData = response?.data?.data;
      // !questions && setQuestions(questionData?.questions);
      // !selectedQuestion && setSelectedQuestion(questionData?.questions[0]);
      return questionData;
    },
    enabled: params.id !== undefined,
  });

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (isSuccess && data?.remainTime) {
      console.log(data.remainTime);
      setTime(data.remainTime);
    }
    !questions && setQuestions(data?.questions);
    !selectedQuestion && setSelectedQuestion(data?.questions[0]);
  }, [isSuccess, data]);

  const { mutate } = useMutation({
    mutationKey: ["AddAnsweredQuestions"],
    mutationFn: (data) => {
      return api.post(`/api/exam/${params.id}/session/current`, data);
    },
  });

  const { mutate: result } = useMutation({
    mutationKey: ["questionresult"],
    mutationFn: () => api.post(`api/exam/${params.id}/result`),
  });

  const { formattedTime, remainingTime } = useLearningTimer(time);

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="flex h-full">
        <QuestionSideBar
          questions={questions}
          percent={data?.percent}
          startsTime={formattedTime}
          remainingTime={remainingTime}
          onSubmit={result}
          activeQuestion={selectedQuestion}
          handleActiveQuestion={(question) => setSelectedQuestion(question)}
        />
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
              {selectedQuestion?.questionText}
            </h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl space-y-3">
              {selectedQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    let questionId;
                    let answerId;
                    const prev = [...questions];
                    const questionIndex = prev.findIndex(
                      (que) => que.id === selectedQuestion.id
                    );

                    const question = prev[questionIndex];
                    question.isAnswered = true;
                    questionId = question.id;

                    question.options = question.options.map((opt) => {
                      if (opt.id === option.id) {
                        answerId = option.id;
                        return { ...opt, isAnswer: true };
                      }
                      return { ...opt, isAnswer: false };
                    });

                    mutate({ questionId, answerId });
                    setQuestions(prev);
                    setSelectedQuestion(question);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    option?.isAnswer
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        option?.isAnswer
                          ? "border-blue-600 bg-blue-600"
                          : "border-blue-300"
                      }`}
                    >
                      {option?.isAnswer && (
                        <div className="w-full h-full scale-50 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-blue-900 text-pretty">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between max-w-2xl">
              <Button
                variant="outline"
                className="py-1 text-blue-700 bg-transparent border-blue-300 hover:bg-blue-100"
              >
                Previous Question
              </Button>

              <Button className="py-1 text-white bg-blue-600 hover:bg-blue-700">
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
