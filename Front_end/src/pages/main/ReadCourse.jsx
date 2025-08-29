import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, BookOpen, BookMarkedIcon, Bookmark } from "lucide-react";
import useCustomQuery from "../../hooks/Query/useCustomQuery";
import Button from "../../components/common/Button/Button";
import api from "../../services/api";
import MarkdownRenderer from "../../components/markdown/MarkdownRenderer ";
import CourseProgress from "../../components/common/progress/CourseProgess";
import CustomizedProgressBars from "../../components/common/progress/LinearProgress";

const ReadCourse = () => {
  const { slug } = useParams();
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [lessonId, setLessonId] = useState(null);

  const queryClient = useQueryClient();

  const { data, error } = useCustomQuery(
    "courseDetail",
    `/api/Enrollments/${slug}`
  );

  const { mutate } = useMutation({
    mutationKey: ["courseMutation", { id: data?.course?.id }],
    mutationFn: (datas) => {
      api.post(`/api/progress/course/${data?.course?.id}`, { ...datas });
    },
    onMutate: (variables) => {
      const prev = queryClient.getQueryData(["courseDetail"]);

      queryClient.setQueryData(["courseDetail"], (oldData) => {
        const old = { ...oldData };
        const course = old?.data?.data?.course || {};
        const courseData = old?.data?.data?.courseData || {};

        return {
          ...oldData,
          data: {
            ...oldData?.data,
            data: {
              ...oldData?.data?.data,
              course: {
                ...course,
                courseProgress:
                  variables.completed === "COMPLETED"
                    ? Math.round(
                        ((course.completedLesson + 1) / course.totalLesson) *
                          100
                      )
                    : Math.round(
                        ((course.completedLesson - 1) / course.totalLesson) *
                          100
                      ),
                completedLesson:
                  variables.completed === "COMPLETED"
                    ? course.completedLesson + 1
                    : course.completedLesson - 1,
              },
              courseData: courseData,
            },
          },
        };
      });

      return { prev: prev?.data?.data || {} };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["courseDetail"], () => context.prev);
    },
  });

  const handleOnChange = (subChapterId, completed) =>
    mutate({ subChapterId, completed });

  return (
    <div>
      <div className="my-8 mx-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
          {data?.course?.title}
        </h1>
        <p className="text-muted-foreground mb-4 text-pretty">
          {data?.course?.description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Course Progress</span>
            <span>
              {data?.course?.completedLesson} of {data?.course?.totalLesson}{" "}
              sections
            </span>
          </div>
          <CustomizedProgressBars
            value={data?.course?.courseProgress}
            className="h-2"
          />
        </div>
      </div>

      <div className="flex h-[88.5vh]">
        <div className=" flex-1/3 flex overflow-y-scroll  flex-col p-2 gap-2 bg-gray-50 border-r border-gray-200 ">
          <h3 className="capitalize text-md font-semibold p-2">
            Course contents
          </h3>
          {data?.courseData?.map((chapter) => (
            <div className="capitalize  text-[#112A46] mb-2">
              <h3 className="text-xl pl-3 pb-3 truncate  font-semibold">
                {chapter.title}
              </h3>
              <ul className="list-disc flex flex-col gap-1">
                {chapter?.subChapters?.map((lesson, i) => (
                  <li
                    key={lesson.id}
                    className={` list-none  pl-3 flex gap-2 cursor-pointer delay-100 ${
                      activeLessonId === lesson.id
                        ? "bg-blue-500 hover:bg-blue-600  text-white "
                        : "hover:bg-gray-300"
                    }`}
                  >
                    <input
                      className="accent-green-600 cursor-pointer outline-green-600 w-4 h-auto"
                      style={{
                        accentColor: "green",
                        color: "green",
                        border: "2px solid green",
                      }}
                      type="checkbox"
                      name="completed"
                      defaultChecked={lesson.completed === "COMPLETED"}
                      onClick={(e) => {
                        setLessonId(lesson.id);
                        if (e.target.checked) {
                          handleOnChange(lesson.id, "COMPLETED");
                        } else {
                          handleOnChange(lesson.id, "IN_PROGRESS");
                        }
                      }}
                    />

                    <span
                      className="truncate ml-2 block w-full"
                      onClick={() => setActiveLessonId(lesson.id)}
                    >
                      {lesson.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col mx-8 rounded-md  border-gray-200 border shadow shadow-gray-200  p-8 gap-4 overflow-y-scroll  text-xl">
          <ReadCourseSkeleton
            id={activeLessonId || data?.courseData[1]?.subChapters[0]?.id}
            enrollmentId={data?.enrollment.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadCourse;

const ReadCourseSkeleton = ({ id, enrollmentId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["courseContent", id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return api.get(`/api/sub-chapter/file/${id}`);
    },
    staleTime: 0,
  });

  const { data: isInBookmark } = useQuery({
    queryKey: ["getBookmarks", enrollmentId, id],
    queryFn: ({ queryKey }) => {
      const [, enrollmentId, id] = queryKey;
      return api.get(`/api/bookmarks/${enrollmentId}/${id}`);
    },
    staleTime: 0,
    select: (data) => {
      if (typeof data?.data?.data === "boolean") {
        return data?.data?.data;
      }
      return data?.data;
    },
  });

  const { mutate, error } = useMutation({
    mutationKey: ["toggleBookmark"],
    mutationFn: (data) => api.post(`/api/bookmarks/toggle`, data),
    onMutate: () => {
      const context = queryClient.getQueryData([
        "getBookmarks",
        enrollmentId,
        id,
      ]);
      queryClient.setQueryData(["getBookmarks", enrollmentId, id], (old) => ({
        ...old,
        data: !isInBookmark,
      }));
      return context;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-end">
        {/* <i
          onClick={() => mutate({ subChapterId: id, enrollmentId })}
          className={`fa-solid text-2xl cursor-pointer ${
            isInBookmark ? "text-blue-500" : "text-gray-500"
          } fa-bookmark`}
        ></i> */}
        <Bookmark
          color={isInBookmark ? "blue" : "gray"}
          fill={isInBookmark ? "blue" : "transparent"}
          onClick={() => mutate({ subChapterId: id, enrollmentId })}
          className="cursor-pointer"
        />
      </div>
      <MarkdownRenderer content={data?.data} />
      <PageButtons />
    </>
  );
};

const PageButtons = () => (
  <div className="flex items-center justify-between">
    <Button className="bg-blue-700 capitalize py-2 px-4 text-[16px] text-white">
      <i className="fa-solid fa-angle-left text-white text-md pr-1"></i>
      Previous
    </Button>
    <Button className="bg-blue-700 capitalize py-2 px-4 text-[16px] text-white">
      Next
      <i className="fa-solid fa-angle-right text-white text-md pl-1"></i>
    </Button>
  </div>
);
