import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import useCustomQuery from "../../hooks/Query/useCustomQuery";
import usePostMutation from "../../hooks/mutaion/usePostMutation";

import Button from "../../components/common/Button/Button";
import Chapter from "../../components/course/Content/Chapter";
import SubChapter from "../../components/course/Content/SubChapter";
import { scrollToStart } from "../../utils/scroll";
import api from "../../services/api";

const CourseDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    scrollToStart("instant");
  }, []);

  const { data } = useCustomQuery("courseDetail", `api/course/${slug}`);

  const { mutate: enroll } = usePostMutation(`api/enrollments`, {
    onSuccess: () => {
      console.log("Enrollment successful");
    },
    onError: (error) => {
      console.error("Enrollment failed:", error);
    },
  });

  const { data: lessonsData, error } = useQuery({
    queryKey: ["courseLessons", { id: data?.course?.id }],
    queryFn: ({ queryKey }) => {
      const { id } = queryKey[1];

      return api.get(`api/course/${id}/chapters`);
    },
    enabled: true,
    select: (response) => {
      console.log("Lessons response:", response);
      return response.data.data;
    },
  });

  if (error) {
    console.error("Error fetching lessons:", error);
  }

  console.log("Lessons data:", lessonsData);

  const handleEnrollment = () => {
    console.log("Enrolling in course:", data?.course?.id);
    enroll({ courseId: data?.course?.id });
  };

  return (
    <div class="container bg-white font-sans text-gray-800 mx-auto px-4 py-8 max-w-6xl">
      <div class="bg-indigo-600 text-white rounded-xl p-8 mb-10">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-2/3">
            <h1 class="text-3xl md:text-4xl font-bold  mb-4">
              {data?.course?.title}
            </h1>
            <p class="text-md text-gray-100  mb-6">
              {data?.course?.description}
            </p>
            <div class="flex flex-wrap text-gray-100 items-center gap-6 mb-6">
              <div class="flex items-center">
                <div class="flex gap-1 text-[#ffa202] mr-2">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <span class=" font-medium">
                  {data?.averageRating}(
                  <Link>{data?.totalRatings} ratings</Link> )
                </span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-book-open  mr-2"></i>
                <span class="">{data?.totalLessons} Lessons</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-users  mr-2"></i>
                <span class="">{data?.totalStudents} Students</span>
              </div>
            </div>
            <Button
              onClick={handleEnrollment}
              className="bg-gray-50 hover:bg-gray-100 text-indigo-500 hover:text-indigo-600"
            >
              Enroll for Free
            </Button>
          </div>

          <div class="md:w-1/3 flex items-center justify-center">
            <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs">
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md overflow-hidden mb-4">
                <img
                  src={
                    "http://localhost:5000/uploads/" +
                    data?.course?.thumbnail.split("\\")[1]
                  }
                  alt="Course thumbnail"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-6">What You'll Learn</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div class="flex items-start">
            <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <p class="text-gray-700">
              Understand the core concepts of HTML and CSS
            </p>
          </div>
          <div class="flex items-start">
            <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <p class="text-gray-700">
              Build responsive layouts with modern CSS techniques
            </p>
          </div>
          <div class="flex items-start">
            <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <p class="text-gray-700">
              Add interactivity to websites with JavaScript
            </p>
          </div>
          <div class="flex items-start">
            <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <p class="text-gray-700">
              Work with developer tools and debug your code
            </p>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-blue-900 mb-5">Course Content</h2>
        <div>
          {lessonsData?.length > 0 && (
            <div>
              {lessonsData.map((lesson) => {
                const { subChapters } = lesson;
                return (
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <Chapter
                      title={lesson.title}
                      sectionNumber={lesson.order}
                    />
                    {subChapters?.length > 0 && (
                      <div class="border-t border-gray-200">
                        {subChapters.map((subChapter) => (
                          <SubChapter
                            key={subChapter.id}
                            title={subChapter.title}
                            sectionNumber={subChapter.order}
                            isMainColor={false}
                            totalMinute={10}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
