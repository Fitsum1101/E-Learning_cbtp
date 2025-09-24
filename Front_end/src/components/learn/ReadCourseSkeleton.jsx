import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { ClipLoader } from "react-spinners";

import MarkdownRenderer from "../markdown/MarkdownRenderer ";
import api from "../../services/api";
import { PageButtons } from "./PageButtons";

const ReadCourseSkeleton = (props) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["courseContent", { id: props.id }],
    queryFn: ({ queryKey }) => {
      console.log(queryKey);
      return api.get(`/api/sub-chapter/file/${queryKey[1].id}`);
    },
    staleTime: 0,
  });

  const { data: isInBookmark } = useQuery({
    queryKey: ["getBookmarks", props.enrollmentId, props.id],
    queryFn: ({ queryKey }) => {
      const [, enrollmentId, id] = queryKey;
      return api.get(`/api/bookmarks/${enrollmentId}/${id}`);
    },
    select: (data) => {
      if (typeof data?.data?.data === "boolean") {
        return data?.data?.data;
      }
      return data?.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["toggleBookmark"],
    mutationFn: (data) => api.post(`/api/bookmarks/toggle`, data),
    onMutate: () => {
      const context = queryClient.getQueryData([
        "getBookmarks",
        props.enrollmentId,
        props.id,
      ]);
      queryClient.setQueryData(
        ["getBookmarks", props.enrollmentId, props.id],
        (old) => ({
          ...old,
          data: !isInBookmark,
        })
      );
      return context;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ClipLoader color="blue" size={50} />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 border-b border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-900 capitalize text-balance">
            {props.title}
          </h2>
          <span className="text-sm text-blue-600">{60}% complete</span>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Bookmark
          color={isInBookmark ? "blue" : "gray"}
          fill={isInBookmark ? "blue" : "transparent"}
          onClick={() =>
            mutate({ subChapterId: props.id, enrollmentId: props.enrollmentId })
          }
          className="mt-2 cursor-pointer"
        />
      </div>
      <MarkdownRenderer content={data?.data} />
      <PageButtons
        isNextExists={props.isNextExists}
        isPreviousExists={props.isPreviousExists}
      />
    </>
  );
};

export default ReadCourseSkeleton;
