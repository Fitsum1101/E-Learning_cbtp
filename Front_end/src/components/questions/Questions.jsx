import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Edit, Trash2 } from "lucide-react";

import api from "../../services/api";

const DisplayQuestions = ({ selectCourse, handleQuestionEdit }) => {
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ["questions", { slug: selectCourse?.slug }],
    queryFn: ({ pageParam = 1, queryKey }) =>
      api.get(`api/questions?page=${pageParam}&filter=${queryKey[1]?.slug}`),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data?.data.hasMore ? allPages.length + 1 : undefined;
    },
    select: ({ pages }) => {
      return pages.map((dt) => dt?.data?.data);
    },
  });

  console.log({ data });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-3">
        {data?.map((info) =>
          info?.questions?.map((que, index) => (
            <div
              className="p-10 bg-white shadow rounded-xl shadow-gray-300"
              key={index}
            >
              <div className="flex items-center justify-between">
                <p className="px-1 text-sm border border-gray-200 text-gray-950">
                  {que?.course.title}
                </p>
                <div className="flex items-center gap-6 pb-3">
                  <Edit
                    onClick={() => handleQuestionEdit(que.id, que?.courseId)}
                    className="w-4 c cursor-pointer h-4 text-gray-600"
                  />
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="pb-8 text-lg font-semibold text-gray-800">
                  {que?.question}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {que?.options.map((opt, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                          opt.isCorrect === true
                            ? "border-blue-600 bg-blue-600"
                            : "border-blue-300"
                        }`}
                      >
                        {opt.isCorrect && (
                          <div className="w-full h-full scale-50 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-blue-900 text-pretty">
                        {opt.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div ref={ref}></div>
      {isPending && <p className="text-4xl text-black">Loading...</p>}
    </div>
  );
};

export default DisplayQuestions;
