import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useState } from "react";
import ModalLesson from "../../ui/Modal/ModalLesson";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import usePostMutation from "../../hooks/mutaion/usePostMutation";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Lessons = () => {
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [chapterId, setChapterId] = useState(undefined);
  const location = useLocation().state;

  console.log({ location });

  const { data: courseData } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/api/course"),
    select: (data) => data.data,
  });

  const { data: lessonsData } = useQuery({
    queryKey: ["courseLessons", { id: selectedCourse }],
    queryFn: ({ queryKey }) => {
      const { id } = queryKey[1];

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
            <div>
              {lessonsData.map((lesson) => {
                const { subChapters } = lesson;
                return (
                  <div className="chapter-item px-6 py-4 transition-all hover:bg-gray-50">
                    <Chapter
                      handleSubChapterShowModel={() => {
                        setChapterId(lesson.id);
                        setShowSubModal(!showSubModal);
                      }}
                      isLessonExists={subChapters.length > 0}
                      title={lesson.title}
                    />
                    {subChapters.length > 0 ? (
                      subChapters.map((data) => (
                        <Subchapter order={data.order} title={data.title} />
                      ))
                    ) : (
                      <DisplayData
                        HandleOnclick={() => {
                          setChapterId(lesson.id);
                          setShowSubModal(!showSubModal);
                        }}
                        modalName={"Sub-chapter"}
                        modalNameButton={"add sub-chapters"}
                        showTages={false}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {lessonsData?.length <= 0 && (
            <DisplayData
              HandleOnclick={() => setShowModal(!showModal)}
              modalName={"chapter"}
              modalNameButton={"add chapters"}
            />
          )}
        </div>
      </div>
      {showModal && (
        <AddChapterModal
          courseId={selectedCourse}
          handleCloseModal={() => setShowModal(!showModal)}
        />
      )}

      {showSubModal && (
        <AddSubChapterModal
          handleCloseModal={() => setShowSubModal(!showSubModal)}
          chapterId={chapterId}
        />
      )}
    </div>
  );
};

function Chapter({ title, handleSubChapterShowModel, isLessonExists }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <i className="fas fa-grip-vertical text-gray-400 mr-3 cursor-move hover:text-gray-600"></i>
        <div>
          <h4 className="font-medium capitalize text-gray-900">{title}</h4>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {isLessonExists && (
          <button
            onClick={handleSubChapterShowModel}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          >
            <i className="fas fa-plus mr-1"></i> Add Subchapter
          </button>
        )}
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

function Subchapter({ title, order }) {
  return (
    <div className="mt-3 ml-8 space-y-3">
      <div className="subchapter-item px-4 py-3 transition-all hover:bg-gray-50 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-grip-vertical text-gray-400 mr-3 cursor-move hover:text-gray-600"></i>
            <div>
              <h5 className="text-sm font-medium text-gray-900">{title}</h5>
              <p class="text-xs text-gray-500">order • {order}</p>
            </div>
          </div>
          <div className="flex items-center w-[100px] space-x-2">
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

function DisplayData({
  HandleOnclick,
  modalName,
  modalNameButton,
  showTages = true,
}) {
  return (
    <div id="empty-state" className="px-6 py-12 text-center">
      {showTages && (
        <>
          <i className="fas fa-book-open text-gray-300 text-4xl mb-3"></i>
          <h3 className="text-lg font-medium text-gray-900">
            No {modalName}s yet
          </h3>
        </>
      )}
      <p className="mt-1 text-sm text-gray-500">
        Get started by adding your first {modalName}.
      </p>

      <button
        onClick={HandleOnclick}
        className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <i className="fas fa-plus mr-1"></i> {modalNameButton}
      </button>
    </div>
  );
}

export default Lessons;

function AddChapterModal({ handleCloseModal, courseId }) {
  const [errors, setErrors] = useState({});
  const isErrorExists = Object.keys(errors).length > 0;

  const { mutate } = usePostMutation(
    "api/chapter",
    {
      onSuccess: () => {
        toast.success("Chapter added successfully");
        setErrors({});
        handleCloseModal();
      },
      onError: (error) => {
        setErrors(error);
      },
    },
    "application/json"
  );

  const handleAddChapter = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("chapter-title");
    const order = formData.get("order");

    if (!title || !order) {
      if (!title) {
        setErrors((prev) => ({ ...prev, title: "Chapter title is required" }));
      }

      if (!order) {
        setErrors((prev) => ({ ...prev, order: "Chapter order is required" }));
      }
      return;
    }

    const chapterData = {
      title,
      order,
      courseId,
    };
    mutate({ ...chapterData });
  };

  return (
    <ModalLesson>
      <form onSubmit={handleAddChapter} method="POST" className="relative">
        <div className="flex items-center mb-3  gap-2">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500/60">
            <i className="fas fa-plus text-indigo-600"></i>
          </div>
          <h2 className="text-xl pb-2 font-semibold text-gray-800">
            Add Chapter
          </h2>
        </div>

        <Input
          type="text"
          id="chapter-title"
          name="chapter-title"
          placeholder="Enter chapter title"
          onChange={() => {
            setErrors((prev) => ({ ...prev, title: null }));
          }}
          label={"Chapter Title"}
          required={isErrorExists && errors.title ? true : false}
          error={isErrorExists && errors.title}
        />
        <Input
          type="number"
          id="order"
          name="order"
          placeholder="e.g. 1"
          onChange={() => {
            setErrors((prev) => ({ ...prev, order: null }));
          }}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring"
          min={1}
          label="Chapter Order"
          required={isErrorExists && errors.order ? true : false}
          error={isErrorExists && errors.order}
        />
        <div className="flex justify-end space-x-2">
          <Button>cancel</Button>
          <Button type="sumbit">add</Button>
        </div>
        <span className="absolute z-100 -top-6 -right-6 ">
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

function AddSubChapterModal({ chapterId, handleCloseModal }) {
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(undefined);

  const { mutate, isPending } = usePostMutation(
    "api/sub-chapter",
    {
      onSuccess: () => {
        toast.success("Chapter added successfully");
        setErrors({});
        handleCloseModal();
      },
      onError: (error) => {
        setErrors(error);
      },
    },
    "application/json"
  );

  const isErrorExists = Object.keys(errors).length > 0;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;

    const fileType = file.name.slice(-2);

    if (fileType !== "md") {
      return setErrors((prev) => ({
        ...prev,
        course_file: "please upload markdown  file",
      }));
    }

    if (file.size > maxSize) {
      return setErrors((prev) => ({
        ...prev,
        course_file: "file size needs to be less than 10 mg",
      }));
    }
    if (isErrorExists && errors.course_file) {
      setErrors(createNewObject(errors, "course_file"));
    }

    setFile(file);
  };

  if (isPending) {
    return (
      <ModalLesson>
        <p className="text-xl uppercase text-blue-700">Loading</p>;
      </ModalLesson>
    );
  }

  const handleAddSubChapter = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const order = formData.get("order");

    if (!title || !order || !file) {
      if (!title) {
        setErrors((prev) => ({ ...prev, title: "Chapter title is required" }));
      }

      if (!order) {
        setErrors((prev) => ({ ...prev, order: "Chapter order is required" }));
      }

      if (!file) {
        setErrors((prev) => ({ ...prev, course_file: "please uploade file" }));
      }

      return;
    }

    if (isErrorExists) return;

    const apiData = new FormData();

    apiData.append("title", title);
    apiData.append("order", order);
    apiData.append("course_file", file);
    apiData.append("chapterId", chapterId);

    mutate(apiData);
  };

  return (
    <ModalLesson>
      <form onSubmit={handleAddSubChapter} action="" method="POST">
        <div className="flex items-center mb-3  gap-2">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500/60">
            <i className="fas fa-plus text-indigo-600"></i>
          </div>
          <h2 className="text-xl pb-2 font-semibold text-gray-800">
            Add sub Chapter
          </h2>
        </div>
        <Input
          type="text"
          id="title"
          name={"title"}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter chapter title"
          label={"chapter title"}
          onChange={() => {
            setErrors(createNewObject(errors, "title"));
          }}
          required={isErrorExists && errors.title}
          error={isErrorExists && errors.title}
        />
        <Input
          type="number"
          id="order"
          name="order"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 1"
          onChange={() => {
            setErrors(createNewObject(errors, "order"));
          }}
          min={1}
          label=" Chapter Order"
          required={isErrorExists && errors.order}
          error={isErrorExists && errors.order}
        />
        <Input
          type="file"
          id="chapter-file"
          onChange={handleFileChange}
          name={"course_file"}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
          label="Reading file"
          placeholder="insert please the file that students we read"
          required={isErrorExists && errors["course_file"]}
          error={isErrorExists && errors["course_file"]}
        />
        <div className="flex justify-end  space-x-2">
          <Button>cancel</Button>
          <Button disabled={isPending} type="submit">
            add
          </Button>
        </div>
        <span className="absolute z-100 -top-6 -right-6 ">
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

const createNewObject = (prevObject, breakName) => {
  const newObject = {};
  for (let item in prevObject) {
    if (item !== breakName) {
      newObject[item] = prevObject[item];
    }
  }
  return newObject;
};
