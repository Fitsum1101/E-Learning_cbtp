import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash } from "lucide-react";

import api from "../../../services/api";
import Button from "../../../components/common/Button/Button";

const filterObject = (prev, key, value) => ({ ...prev, [key]: value });

const ExamPage = () => {
  const queryClient = useQueryClient();

  const [urlElemets, setUrlElements] = useState({
    courseId: undefined,
    searchParams: "",
    attempt: 1,
  });

  const [questionsId, setQuestionsId] = useState([]);

  const { data: courseData } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/api/course/user"),

    select: (data) => {
      return data.data;
    },
  });

  const { data: questions, isLoading } = useQuery({
    queryKey: ["courses", urlElemets],
    queryFn: () =>
      api.get(
        `api/questions/course/${urlElemets.courseId}?search=${urlElemets.searchParams}&attempt=${urlElemets.attempt}`
      ),
    select: (data) => {
      return data.data.data;
    },
  });

  console.log({ questions });

  const { data: examQuestions } = useQuery({
    queryKey: ["examCourses", urlElemets],
    queryFn: () =>
      api.get(
        `api/questions/exam/course/${urlElemets.courseId}?search=${urlElemets.searchParams}&attempt=${urlElemets.attempt}`
      ),
    select: (data) => {
      return data.data.data;
    },
  });

  const {
    mutate: addQuestions,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["fillExamQuestions"],
    mutationFn: (data) =>
      api.post(`api/exam/course/${urlElemets.courseId}`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", urlElemets],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["examCourses", urlElemets],
        exact: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteQuestion } = useMutation({
    mutationKey: ["deleteExamQuestion"],
    mutationFn: (id) => api.delete(`api/exam/question/${id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", urlElemets],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["examCourses", urlElemets],
        exact: true,
      });
    },
  });

  const handleQuestions = () => {
    if (questionsId.length == 0) return;
    addQuestions({ questionsId, attempt: +urlElemets.attempt });
    setQuestionsId([]);
  };

  const isExamQuestionsExists = examQuestions && examQuestions.length > 0;

  return (
    <div className="flex-1">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Exam Management</h1>
      </header>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Course
              </label>
              <select
                name="courseId"
                onChange={(e) =>
                  setUrlElements((prev) =>
                    filterObject(prev, "courseId", e.target.value)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {courseData?.data.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Attempt Number
              </label>
              <select
                onChange={(e) =>
                  setUrlElements((prev) =>
                    filterObject(prev, "attempt", e.target.value)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>First Attempt</option>
                <option value={2}>Second Attempt</option>
                <option value={3}>Final Attempt</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Available Questions
              </h2>
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) =>
                    setUrlElements((prev) =>
                      filterObject(prev, "searchParams", e.target.value.trim())
                    )
                  }
                  placeholder="Search questions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i
                  data-feather="search"
                  className="absolute left-3 top-3 text-gray-400"
                ></i>
              </div>
            </div>
            <div>
              <div className="h-96 overflow-y-auto">
                {questions && questions.length > 0 ? (
                  !isLoading ? (
                    questions.map((question) => (
                      <div
                        key={question.id}
                        className="p-3 border border-gray-200 rounded-lg question-item flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={questionsId.includes(question.id)}
                          onClick={() =>
                            setQuestionsId((prev) => {
                              let newQuestionsId = [...prev];
                              const index = newQuestionsId.findIndex(
                                (id) => id === question.id
                              );
                              if (index !== -1)
                                newQuestionsId = newQuestionsId.filter(
                                  (id) => id !== question.id
                                );
                              else newQuestionsId.push(question.id);
                              return newQuestionsId;
                            })
                          }
                          className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium">{question.question}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-blue-600 flex h-full items-center capitalize  justify-center">
                      loading...
                    </h1>
                  )
                ) : (
                  <h1 className="bg-blue-300 h-[40vh] flex items-center justify-center capitalize  text-white">
                    no question yet
                  </h1>
                )}
              </div>
              <Button
                disabled={isPending || questionsId.length === 0}
                className="w-full hover:bg-blue-700 py-1 bg-blue-600 text-white"
                onClick={handleQuestions}
              >
                Add Questions
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 ">
              Exam Questions
            </h2>
            <div className="mb-4">
              <p className="text-gray-700">
                Total Points: <span className="font-bold">12</span>
              </p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {isExamQuestionsExists &&
                  examQuestions.map((exam) => (
                    <div className="p-3 border border-gray-200 rounded-lg selected-question flex items-center justify-between">
                      <div>
                        <p className="font-medium">{exam.question}</p>
                      </div>
                      <Trash
                        onClick={() => deleteQuestion(exam.id)}
                        className="w-4 cursor-pointer h-4 text-red-600"
                      />
                    </div>
                  ))}
                {!isExamQuestionsExists && (
                  <h1 className="bg-blue-300 h-[40vh] flex items-center justify-center capitalize  text-white">
                    No exam question yet
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
