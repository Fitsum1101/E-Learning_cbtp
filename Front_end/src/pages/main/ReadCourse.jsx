import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";

import { useParams } from "react-router-dom";

import ReadCourseSkeleton from "../../components/learn/ReadCourseSkeleton";
import { useCourseContext } from "../../store/course/course-context";
import api from "../../services/api";

const ReadCourse = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { lesson, handleLesson, course, handleCourse } = useCourseContext();

  const { data } = useQuery({
    queryKey: ["courseDetail", { slug }],
    queryFn: ({ queryKey }) => {
      return api.get(`/api/Enrollments/${queryKey[1].slug}`);
    },
    select: (res) => {
      const data = res.data?.data;
      let activeLesson;

      data.courseData.forEach((chapter) => {
        const lessonIndex = chapter.subChapters.findIndex(
          (lesson, i) => lesson.isCurrentCourse === true
        );

        if (lessonIndex !== -1) {
          activeLesson = chapter.subChapters[lessonIndex];
        }
      });

      !lesson && handleLesson(activeLesson);

      course?.id !== data?.course?.id &&
        handleCourse({
          id: data?.course?.id,
          title: data?.course?.title,
          description: data?.course.description,
          progress: data?.course?.courseProgress,
        });

      return data;
    },
  });

  const AllLesson = [];

  data?.courseData?.forEach((chapter) =>
    AllLesson.push(...chapter.subChapters)
  );

  let isPreviousExists, isNextExists;

  if (AllLesson.length > 0) {
    const currentLessonIndex = AllLesson.findIndex(
      (sub) => sub.id === lesson?.id
    );

    isPreviousExists = currentLessonIndex !== 0;
    isNextExists = currentLessonIndex !== AllLesson.length - 1;
  }

  const { mutate } = useMutation({
    mutationKey: ["courseMutation", { id: data?.course?.id }],
    mutationFn: (datas) => {
      api.post(`/api/progress/course/${data?.course?.id}`, { ...datas });
    },
    onMutate: (variables) => {
      const prev = queryClient.getQueryData(["courseDetail", { slug }]);

      queryClient.setQueryData(["courseDetail", { slug }], (oldData) => {
        const old = { ...oldData };
        const course = old?.data?.data?.course || {};
        let courseData = old?.data?.data?.courseData || {};

        courseData = courseData.map((chat) => {
          const subChapter = chat?.subChapters.find(
            (sub) => sub.id === variables.subChapterId
          );
          if (subChapter) subChapter.completed = variables.completed;

          return chat;
        });

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
      queryClient.setQueryData(["courseDetail", { slug }], () => context.prev);
    },
    onSuccess: () => {
      handleCourse({
        title: data?.course?.title,
        description: data?.course.description,
        progress: data?.course?.courseProgress,
      });
    },
  });

  const handleQuetionCatch = (lesson) => {
    queryClient.setQueryData(["courseDetail", { slug }], (oldData) => {
      const old = { ...oldData };
      const courseData = old?.data?.data?.courseData || {};
      handleLesson(lesson);
      return {
        ...oldData,
        data: {
          ...oldData?.data,
          data: {
            ...oldData?.data?.data,
            courseData: courseData.map((chapter) => {
              const subChapters = chapter.subChapters.map((les, i) => {
                if (lesson.id === les.id)
                  return { ...les, isCurrentCourse: true };
                else return { ...les, isCurrentCourse: false };
              });
              return { ...chapter, subChapters };
            }),
          },
        },
      };
    });
  };

  const handleOnChange = (subChapterId, completed) =>
    mutate({ subChapterId, completed });

  return (
    <div>
      <div className="flex h-[88.5vh]">
        <div className="flex flex-col gap-2 p-2 border-b border-blue-200 bg-blue-50">
          <h3 className="p-2 font-semibold backdrop-blur-md   capitalize text-md">
            Course contents
          </h3>
          <div className="overflow-y-scroll">
            {data?.courseData?.map((chapter) => (
              <div className="capitalize text-[#112A46] mb-2">
                <h3 className="pb-3 pl-3 text-xl font-semibold truncate">
                  {chapter.title}
                </h3>
                <ul className="flex flex-col gap-2 list-disc">
                  {chapter?.subChapters?.map((les, i) => (
                    <li
                      key={les.id}
                      onClick={() => handleQuetionCatch(les)}
                      className={`w-full text-left flex gap-2 items-center  p-2 rounded-lg border transition-colors ${
                        lesson?.id === les.id
                          ? "border-blue-600 bg-blue-600  text-white"
                          : "border-blue-400 cursor-pointer  bg-blue-50 hover:bg-blue-100 text-blue-800"
                      }`}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          (les.completed === "IN_PROGRESS" || !les.completed) &&
                            handleOnChange(les.id, "COMPLETED");
                          les.completed === "COMPLETED" &&
                            handleOnChange(les.id, "IN_PROGRESS");
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-medium ${
                          les.completed === "COMPLETED"
                            ? lesson.id === les.id
                              ? "border-blue-600 bg-white text-blue-600"
                              : "bg-blue-600 border-blue-600 text-white"
                            : lesson.id === les.id
                            ? "border-white"
                            : "border-blue-400"
                        }`}
                      >
                        {les.completed === "COMPLETED" ? "✓" : null}
                      </div>
                      <p
                        onClick={() => handleQuetionCatch(les)}
                        className="text-sm text-pretty line-clamp-2"
                      >
                        {les.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full gap-4 p-8 mx-8 overflow-y-scroll text-xl bg-white shadow-xl rounded-2xl">
          <ReadCourseSkeleton
            id={lesson && lesson?.id}
            enrollmentId={data?.enrollment.id}
            title={lesson && lesson.title}
            isNextExists={isNextExists}
            isPreviousExists={isPreviousExists}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadCourse;
