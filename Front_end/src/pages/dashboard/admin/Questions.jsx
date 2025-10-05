import { Plus } from "lucide-react";
import Button from "../../../components/common/Button/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import CreateUpdateQuestions from "../../../components/questions/CreateQuestions";
import DisplayQuestions from "../../../components/questions/Questions";
import SelectCourse from "../../../components/questions/SelectCourse";
import EditQuestions from "../../../components/questions/EditQuestions";

const initalSelectedCourse = {
  id: "11111",
  title: "All",
  slug: "all",
};
const Questions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [creatUpdateQuestion, setcreatUpdateQuestion] = useState({
    createQuestion: false,
    updateQuestionsId: undefined,
  });

  const [selectedCourse, setSelectedCourse] = useState(initalSelectedCourse);

  const { data: course } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/api/course/user"),
    select: (data) => data.data,
  });

  console.log({ courses: course?.data });

  return (
    <div className="min-h-screen bg-background">
      <div className="container p-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Question Management Dashboard
              </h1>
              <p className="text-muted-foreground">
                Create, edit, and manage multiple-choice questions for your
                courses
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 mb-8 bg-white rounded-lg shadow ">
          {!creatUpdateQuestion.createQuestion &&
            !creatUpdateQuestion.updateQuestionsId && (
              <div>
                <p className="pb-6 text-lg font-semibold capitalize">
                  Quick Actions
                </p>
                <Button
                  className="flex items-center justify-center w-full py-1 mb-4 text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setcreatUpdateQuestion({
                      createQuestion: true,
                      updateQuestionsId: undefined,
                    });
                    setSelectedCourse(course?.data[0]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Questions
                </Button>

                <div>
                  <p className="py-2 font-semibold text-md">Filter by Course</p>
                  <SelectCourse
                    courses={course?.data}
                    selectedCourse={selectedCourse}
                    handleOpen={() => setDropdownOpen(!dropdownOpen)}
                    dropdownOpen={dropdownOpen}
                    handleSelcetCourse={(course) => setSelectedCourse(course)}
                  />
                </div>
                <hr className="my-3 text-gray-300" />
                <div className="flex flex-col text-gray-500 capitalize">
                  <p>
                    total questions: <span>{course?.data?.length}</span>
                  </p>
                  <p>
                    filtered: <span>{course?.data?.length}</span>
                  </p>
                </div>
              </div>
            )}
          {creatUpdateQuestion.createQuestion && (
            <CreateUpdateQuestions
              selectedCourse={selectedCourse}
              courses={course?.data}
              handleOpen={() => setDropdownOpen(!dropdownOpen)}
              dropdownOpen={dropdownOpen}
              handleCreateQuestion={() => {
                setcreatUpdateQuestion({
                  createQuestion: false,
                  updateQuestionsId: undefined,
                });
                setSelectedCourse(initalSelectedCourse);
              }}
              handleSelcetCourse={(course) => setSelectedCourse(course)}
            />
          )}
          {creatUpdateQuestion.updateQuestionsId && (
            <EditQuestions
              handelCloseUpdate={() => {
                setcreatUpdateQuestion({
                  createQuestion: false,
                  updateQuestionsId: undefined,
                });
                setSelectedCourse(initalSelectedCourse);
              }}
              selectedCourse={selectedCourse}
              courses={course?.data}
              handleOpen={() => setDropdownOpen(!dropdownOpen)}
              dropdownOpen={dropdownOpen}
              handleSelcetCourse={(course) => setSelectedCourse(course)}
              id={creatUpdateQuestion.updateQuestionsId}
            />
          )}
        </div>
        {!creatUpdateQuestion.createQuestion &&
          !creatUpdateQuestion.updateQuestionsId && (
            <DisplayQuestions
              handleQuestionEdit={(id, courseId) => {
                setcreatUpdateQuestion({
                  createQuestion: false,
                  updateQuestionsId: id,
                });
                setSelectedCourse(
                  course?.data.find((cour) => cour.id === courseId)
                );
              }}
              selectCourse={selectedCourse}
            />
          )}
      </div>
    </div>
  );
};

export default Questions;
