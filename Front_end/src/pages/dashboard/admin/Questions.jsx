import { ChevronDown, ChevronUp, File, Plus, Save, X } from "lucide-react";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useClickOutside } from "../../../hooks/handleClickOutside";

const Questions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createQuestion, setCreateQuestion] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(undefined);

  console.log(selectedCourse);

  const { data: course } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/api/course"),
    select: (data) => data.data,
  });

  const handleCreateQuestion = () => {
    setCreateQuestion(true);
  };

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
        {/* {select course} */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow ">
          {!createQuestion && (
            <div>
              <p className="pb-6 text-lg font-semibold capitalize">
                Quick Actions
              </p>
              <Button
                className="flex items-center justify-center w-full py-1 mb-4 text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateQuestion}
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
          {createQuestion && (
            <CreateUpdateQuestions
              selectedCourse={course?.data[0]}
              courses={course?.data}
              handleOpen={() => setDropdownOpen(!dropdownOpen)}
              dropdownOpen={dropdownOpen}
              handleCreateQuestion={() => setCreateQuestion(false)}
              handleSelcetCourse={(course) => setSelectedCourse(course)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;

const SelectCourse = ({
  handleOpen,
  courses,
  handleSelcetCourse,
  selectedCourse,
  dropdownOpen,
}) => {
  let domNode = useClickOutside(() => {
    handleOpen(false);
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        className={`bg-white flex items-center rounded-[5px] relative px-5 py-[8px] text-base font-medium text-foreground border border-gray-300 hover:border-blue-400  `}
      >
        {selectedCourse?.title}
        {!dropdownOpen ? (
          <ChevronDown className="w-4 h-4 ml-3" />
        ) : (
          <ChevronUp className="w-4 h-4 ml-3" />
        )}
      </Button>
      {dropdownOpen && (
        <div
          ref={domNode}
          className={`shadow-1 h-[30vh] overflow-y-scroll absolute border p-1 border-gray-300 shadow-gray-300 left-15 z-40 mt-2 w-[300px] rounded-md bg-white text-black py-[10px] transition-all `}
        >
          {courses.map((course) => (
            <div
              className="flex items-center justify-between p-1 text-gray-700 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white"
              key={course.id}
              onClick={() => handleSelcetCourse(course)}
            >
              {course.title}
              {selectedCourse?.title === course?.title && (
                <span className="text-gray-500">&#10004;</span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const CreateUpdateQuestions = ({
  handleCreateQuestion,
  selectedCourse,
  courses,
  handleOpen,
  handleSelcetCourse,
  dropdownOpen,
}) => {
  const [option, setOption] = useState(2);

  return (
    <div>
      <div className="flex justify-between text-gray-800">
        <h2 className="pb-6 text-lg font-semibold capitalize">
          Create new questions
        </h2>
        <div
          onClick={handleCreateQuestion}
          className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:text-white text-md hover:bg-blue-800"
        >
          <X className="w-5 h-5 " />
        </div>
      </div>
      <Button className="flex items-center px-1 text-white capitalize bg-blue-800 text-md">
        Create new Questions
      </Button>
      <div className="py-2">
        <p className="flex items-center pb-1 font-semibold capitalize text-md">
          Course
        </p>
        <SelectCourse
          handleSelcetCourse={handleSelcetCourse}
          handleOpen={handleOpen}
          dropdownOpen={dropdownOpen}
          selectedCourse={selectedCourse}
          courses={courses}
        />
      </div>
      <form action="">
        <div>
          <label
            className="flex items-center pb-1 font-semibold capitalize text-md"
            htmlFor="question"
          >
            Question text
          </label>
          <textarea
            name="question"
            id="question"
            className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <div>
          <div className="w-full ">
            <div className="flex items-center justify-between my-3">
              <p className="flex items-center font-semibold capitalize text-md">
                answe options
              </p>
              <Button
                className="flex items-center justify-center px-1 py-1 text-sm text-gray-800 border border-blue-800 text-md hover:text-white hover:bg-blue-800"
                onClick={() => {
                  if (option < 6) setOption(option + 1);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>

            <div className="flex flex-col ">
              {Array.from({ length: option }).map((_, index) => (
                <div key={index} className="flex items-center w-full gap-2">
                  <span
                    className={`w-4 h-4  cursor-pointer rounded-full border-blue-300 border-2 `}
                  >
                    <div className="w-full h-full rounded-full scale-5" />
                  </span>
                  <Input
                    className="py-1 border-t-0 border-b border-l-0 border-r-0 focus:py-1 focus:border-b-0 border-b-gray-200"
                    placeholder={`option ${index + 1}`}
                  />
                </div>
              ))}
              <p className="text-sm text-gray-600">
                Select the radio button next to the correct answer. You can add
                up to 6 options.
              </p>
              <div className="flex gap-2 my-4">
                <Button className="flex items-center justify-center py-1 text-white capitalize bg-blue-800 hover:bg-blue-900 capitalizes flex-1/3 ">
                  <Save className="w-5 h-5 mr-2" />
                  create question
                </Button>
                <Button
                  onClick={handleCreateQuestion}
                  className="py-1 capitalize border border-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
