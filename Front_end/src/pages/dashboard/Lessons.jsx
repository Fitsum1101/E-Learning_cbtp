import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useState } from "react";
import ModalLesson from "../../ui/Modal/ModalLesson";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const Lessons = () => {
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const { data: courseData } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/api/course"),
    select: (data) => data.data,
  });

  const { data: lessonsData } = useQuery({
    queryKey: ["courseLessons", { id: selectedCourse }],
    queryFn: ({ queryKey }) => {
      const { id } = queryKey[1];
      console.log(id);
      return api.get(`api/course/${id}/chapters`);
    },
    enabled: () => {
      if (selectedCourse) {
        return true;
      }

      return false;
    },
    select: (response) => {
      return response.data.data;
    },
  });

  return (
    <div className="flex-1  overflow-auto p-4 custom-scrollbar">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-gray-900">
              Manage Course Lessons
            </h3>
            <p className="text-sm text-gray-500">
              Select a course to view and manage its chapters and subchapters
            </p>
          </div>
          <div className="w-full  md:w-64">
            <label
              for="course-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Course
            </label>
            <select
              id="course-select"
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white transition duration-150 ease-in-out 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     hover:shadow-sm 
`}
            >
              <option value="">-- Select a course --</option>
              {courseData?.map((course) => (
                <option value={course.id} key={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div
        id="chapters-container"
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900" id="course-title">
            Course Chapters
          </h3>
          {lessonsData?.length > 0 && (
            <button
              id="add-chapter-btn"
              onClick={() => setShowModal(!showModal)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <i className="fas fa-plus mr-1"></i> Add Chapter
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-200">
          {lessonsData?.length > 0 && (
            <div className="chapter-item px-6 py-4 transition-all hover:bg-gray-50">
              <Chapter />
              <Subchapter />
            </div>
          )}
          {lessonsData?.length <= 0 && (
            <div id="empty-state" className="px-6 py-12 text-center">
              <i className="fas fa-book-open text-gray-300 text-4xl mb-3"></i>
              <h3 className="text-lg font-medium text-gray-900">
                No chapters yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first chapter.
              </p>

              <button
                onClick={() => setShowModal(!showModal)}
                className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fas fa-plus mr-1"></i> Add Chapter
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <AddChapterModal handleCloseModal={() => setShowModal(!showModal)} />
      )}
    </div>
  );
};

function Chapter(params) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <i className="fas fa-grip-vertical text-gray-400 mr-3 cursor-move hover:text-gray-600"></i>
        <div>
          <h4 className="font-medium text-gray-900">
            Chapter 1: Getting Started
          </h4>
          {/* <p className="text-sm text-gray-500">Introduction to the course</p> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
          <i className="fas fa-plus mr-1"></i> Add Subchapter
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-red-500 hover:text-red-700">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

function Subchapter(params) {
  return (
    <div className="mt-3 ml-8 space-y-3">
      <div className="subchapter-item px-4 py-3 transition-all hover:bg-gray-50 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-grip-vertical text-gray-400 mr-3 cursor-move hover:text-gray-600"></i>
            <div>
              <h5 className="text-sm font-medium text-gray-900">
                1.1 Welcome to the Course
              </h5>
              <p className="text-xs text-gray-500">Video • 5 min</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-edit"></i>
            </button>
            <button className="text-red-500 hover:text-red-700">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="subchapter-item px-4 py-3 transition-all hover:bg-gray-50 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-grip-vertical text-gray-400 mr-3 cursor-move hover:text-gray-600"></i>
            <div>
              <h5 className="text-sm font-medium text-gray-900">
                1.2 Course Overview
              </h5>
              <p className="text-xs text-gray-500">Reading • 10 min</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-edit"></i>
            </button>
            <button className="text-red-500 hover:text-red-700">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons;

function AddChapterModal({ handleCloseModal }) {
  return (
    <ModalLesson>
      <form className="relative">
        <div className="flex items-center mb-3  gap-2">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500/60">
            <i class="fas fa-plus text-indigo-600"></i>
          </div>
          <h2 className="text-xl pb-2 font-semibold text-gray-800">
            Add Chapter
          </h2>
        </div>

        <Input
          type="text"
          id="chapter-title"
          placeholder="Enter chapter title"
          label={"Chapter Title"}
        />
        <Input
          type="number"
          id="order"
          placeholder="e.g. 1"
          min={1}
          label="Chapter Order"
        />
        <div className="flex justify-end space-x-2">
          <Button>cancel</Button>
          <Button>add</Button>
        </div>
        <span className="absolute z-100 -top-10 -right-8 ">
          <i
            onClick={() => {
              handleCloseModal();
            }}
            className="fas cursor-pointer text-red-600 text-2xl fa-close"
          ></i>
        </span>
      </form>
    </ModalLesson>
  );
}

function AddSubChapterModal() {
  return (
    <ModalLesson>
      <form>
        <h2 className="text-xl font-semibold text-gray-800">Add Chapter</h2>
        <Input
          type="text"
          id="chapter-title"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter chapter title"
          label={"chapter title"}
        />
        <Input
          type="number"
          id="chapter-order"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 1"
          min={1}
          label=" Chapter Order"
        />
        <Input
          type="file"
          id="chapter-file"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
          label=" Chapter Order"
        />
        <div className="flex justify-end space-x-2">
          <Button>cancel</Button>
          <Button>add</Button>
        </div>
      </form>
    </ModalLesson>
  );
}
