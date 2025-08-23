import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useCustomQuery from "../../hooks/Query/useCustomQuery";
import Button from "../../components/common/Button/Button";
import api from "../../services/api";
import MarkdownRenderer from "../../components/markdown/MarkdownRenderer ";

const ReadCourse = () => {
  const { slug } = useParams();
  const [activeLessonId, setActiveLessonId] = useState(null);

  const { data } = useCustomQuery("courseDetail", `api/course/${slug}`);

  return (
    <div className="flex h-[88.5vh]">
      <div className=" flex-1/4 flex overflow-y-scroll  flex-col p-2 gap-2 bg-[#E7E9EB] ">
        {data?.course?.chapters?.map((chapter) => (
          <div className="capitalize  text-[#333] mb-4">
            <h3 className="text-xl pl-3 pb-3 truncate  font-semibold">
              {chapter.title}
            </h3>
            <ul className="list-disc flex flex-col gap-1">
              {chapter.subChapters?.map((lesson, i) => (
                <li
                  onClick={() => setActiveLessonId(lesson.id)}
                  key={lesson.id}
                  className={`capitalize  list-none pl-3 cursor-pointer delay-100 ${
                    activeLessonId === lesson.id
                      ? "bg-blue-500 hover:bg-blue-600 text-white "
                      : "hover:bg-gray-300"
                  }`}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className=" w-full flex flex-col  p-8 gap-4 overflow-y-scroll  text-xl">
        <ReadCourseSkeleton
          id={activeLessonId || data?.course?.chapters[0]?.subChapters[0]?.id}
        />
      </div>
    </div>
  );
};

export default ReadCourse;

const ReadCourseSkeleton = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["courseContent", id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return api.get(`/api/sub-chapter/file/${id}`);
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl capitalize font-semibold">java script</h1>
      </div>
      <PageButtons />
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
