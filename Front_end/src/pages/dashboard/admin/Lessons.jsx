import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import usePostMutation from "../../../hooks/mutaion/usePostMutation";
import api from "../../../services/api";
import ModalLesson from "../../../ui/Modal/ModalLesson";
import Chapter from "../../../components/course/Content/Chapter";
import SortSubChapter from "../../../components/course/Content/SortSubChapter";

const Lessons = () => {
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [chapterId, setChapterId] = useState(undefined);

  const queryClient = useQueryClient();

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
    enabled: true,
    select: (response) => {
      return response.data.data;
    },
  });

  const { mutate: updateSubChapterOrder } = useMutation({
    mutationKey: ["updateSubChapterOrder"],
    mutationFn: (data) =>
      api.patch(
        `api/courses/${data.courseId}/chapters/${data.chapterId}/subchapters/reorder`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseLessons", { id: selectedCourse }],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(`Error updating sub-chapter order: ${error.message}`);
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
              {courseData?.data?.map((course) => (
                <option value={course.id} key={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-blue-900">Course Content</h2>
        {lessonsData?.length > 0 && (
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 shadow-md shadow-gray-300 font-semibold py-2 px-5 text-white text-md mt-3 "
            onClick={() => setShowModal(!showModal)}
          >
            <i className="fas fa-plus mr-1"></i>
            Add Chapter
          </Button>
        )}
      </div>
      <div
        id="chapters-container"
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="divide-y divide-gray-200">
          {lessonsData?.length > 0 && (
            <div>
              {lessonsData.map((lesson) => {
                const { subChapters } = lesson;
                return (
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <Chapter
                      key={lesson.id}
                      title={lesson.title}
                      sectionNumber={lesson.order}
                      config={{
                        openSubChapterModal: () => {
                          setChapterId(lesson.id);
                          setShowSubModal(!showSubModal);
                        },
                      }}
                    />
                    {subChapters.length > 0 ? (
                      <DndContext
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={(e) => {
                          const { active, over } = e;
                          const { id: activeId } = active;
                          const { id: overId } = over;

                          const initialOrder = {
                            id: activeId.split(" ")[1],
                            order: activeId.split(" ")[0],
                          };

                          const finalOrder = {
                            id: overId.split(" ")[1],
                            order: overId.split(" ")[0],
                          };

                          updateSubChapterOrder({
                            chapterId: lesson.id,
                            courseId: selectedCourse,
                            initialOrder,
                            finalOrder,
                          });
                        }}
                      >
                        <SortableContext
                          items={subChapters.map(
                            (data) => `${data.order} ${data.id}`
                          )}
                          strategy={verticalListSortingStrategy}
                        >
                          {subChapters
                            .sort((a, b) => a.order - b.order)
                            .map((data) => (
                              <SortSubChapter
                                totalMinute={data.minute}
                                title={data.title}
                                id={`${data.order} ${data.id}`}
                                key={data.id}
                              />
                            ))}
                        </SortableContext>
                      </DndContext>
                    ) : (
                      <DisplayData
                        HandleOnclick={() => {
                          setChapterId(lesson.id);
                          setShowSubModal(!showSubModal);
                        }}
                        modalName={"Sub-chapter"}
                        modalNameButton={"Add"}
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
              modalNameButton={"Add"}
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

      <Button
        className="bg-[#4F39F6] font-bold hover:bg-indigo-600 py-2  text-white text-md mt-3 "
        onClick={HandleOnclick}
      >
        <i className="fas fa-plus mr-1"></i>
        {modalNameButton}
      </Button>
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

    if (!title) {
      if (!title) {
        setErrors((prev) => ({ ...prev, title: "Chapter title is required" }));
      }
      return;
    }

    const chapterData = {
      title,
      courseId,
    };
    mutate({ ...chapterData });
  };

  return (
    <ModalLesson>
      <form onSubmit={handleAddChapter} method="POST" className="relative ">
        <div className="flex items-center mb-3 gap-2">
          <div className="w-6 h-6 flex cursor-pointer rounded-full bg-blue-500 justify-center items-center">
            <i className="far fa-plus text-white"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Add chapter</h2>
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

        <div className="flex justify-end space-x-2">
          <Button className="border border-[#FF8040]  capitalize hover:bg-[#FF8040] hover:text-white">
            cancel
          </Button>
          <Button
            className="bg-blue-500 text-white px-[1rem] border-blue-500 capitalize hover:bg-blue-600"
            // disabled={isPending}
            type="submit"
          >
            add
          </Button>
        </div>
        <span className="absolute z-100 -top-3 -right-3 ">
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
  const fileInput = useRef(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(undefined);

  const { mutate, isPending, error } = usePostMutation(
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

  console.log(errors);

  if (error) {
    console.log("subchapter failed", error);
  }

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
    console.log("add subChapter");
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const minute = formData.get("minute");

    if (!title || !file || !minute) {
      if (!title) {
        setErrors((prev) => ({ ...prev, title: "Chapter title is required" }));
      }
      if (!minute) {
        setErrors((prev) => ({
          ...prev,
          minute: "Chapter minute is required",
        }));
      }
      if (!file) {
        setErrors((prev) => ({ ...prev, course_file: "please uploade file" }));
      }

      return;
    }

    if (isErrorExists) return;

    const apiData = new FormData();

    apiData.append("title", title);
    apiData.append("course_file", file);
    apiData.append("chapterId", chapterId);
    apiData.append("minute", minute);

    mutate(apiData);
  };

  return (
    <ModalLesson>
      <form onSubmit={handleAddSubChapter} action="" method="POST">
        <div className="flex items-center mb-3  gap-2">
          <div className="w-8 h-8 flex cursor-pointer rounded-full bg-blue-500 justify-center items-center">
            <i className="far fa-plus text-white"></i>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Add Subchapter
          </h2>
        </div>
        <Input
          type="text"
          id="title"
          name={"title"}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the title of this chapter"
          label={"Subchapter Title"}
          onChange={() => {
            setErrors(createNewObject(errors, "title"));
          }}
          required={isErrorExists && errors.title}
          error={isErrorExists && errors.title}
        />
        <Input
          type="number"
          id="minute"
          name={"minute"}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex. 5"
          label={"Total Minute to read the resource"}
          onChange={() => {
            setErrors(createNewObject(errors, "minute"));
          }}
          required={isErrorExists && errors.minute}
          error={isErrorExists && errors.minute}
        />
        <Input
          type="file"
          id="chapter-file"
          ref={fileInput}
          onChange={handleFileChange}
          name={"course_file"}
          className="border hidden cursor-pointer border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
          label="Reading File for Subchapter"
          placeholder="Upload the reading file for this subchapter"
          required={isErrorExists && errors["course_file"]}
          error={isErrorExists && errors["course_file"]}
        />

        <div className="mb-4 flex items-center justify-between">
          {!file && (
            <Button
              type="button"
              className={`border border-gray-300 hover:bg-gray-100 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-gray-500`}
              onClick={() => fileInput.current.click()}
            >
              Upload File
            </Button>
          )}
          {fileInput.current?.files[0]?.name && !errors["course_file"] && (
            <p
              className={`border border-gray-300 font-semibold bg-gray-100 rounded-lg p-2  `}
            >
              {fileInput.current.files[0].name}
              <i
                onClick={() => (setFile(null), (fileInput.current.value = ""))}
                className="fas fa-remove text-red-600 hover:text-red-700 pl-2 cursor-pointer"
              ></i>
            </p>
          )}
        </div>

        <div className="flex justify-end  space-x-3">
          <Button className="border border-[#FF8040]  capitalize hover:bg-[#FF8040] hover:text-white">
            cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-[1rem] border-blue-500 capitalize hover:bg-blue-600"
          >
            add
          </Button>
        </div>
        <span className="absolute z-100 top-2 right-3 ">
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
