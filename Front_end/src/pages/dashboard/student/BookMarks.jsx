import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import Modal from "@mui/material/Modal";
import { useState } from "react";

import { useCourseContext } from "../../../store/course/course-context";
import Button from "../../../components/common/Button/Button";
import api from "../../../services/api";

const BookMarks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  const queryClient = useQueryClient();
  const { handleLesson } = useCourseContext();

  const navigate = useNavigate();

  const handleReading = (lesson) => {
    handleLesson({ ...lesson, id: lesson?.subChapter.id });
    navigate(`/course/${lesson.courseSlug}/learn`);
  };

  const { data: bookmarks } = useQuery({
    queryKey: ["getBookmarks"],
    queryFn: () => api.get(`/api/bookmarks/`),
    staleTime: 0,
    select: (response) => {
      if (typeof response?.data.success === "boolean") {
        return response.data.data;
      }
      return [];
    },
  });

  const { mutate, error } = useMutation({
    mutationKey: ["toggleBookmark"],
    mutationFn: (data) => api.post(`/api/bookmarks/toggle`, data),
    onMutate: (variables) => {
      const context = queryClient.getQueryData(["getBookmarks"]);
      queryClient.setQueryData(["getBookmarks"], (oldData) => {
        const old = { ...oldData };
        const findIndex = old.data.data.findIndex((item) => {
          return (
            item.subChapterId === variables.subChapterId &&
            item.enrollmentId === variables.enrollmentId
          );
        });

        const filtered = [];

        if (findIndex !== -1) {
          filtered.push(...old.data.data.slice(0, findIndex));
          filtered.push(...old.data.data.slice(findIndex + 1));
        }

        return { ...old, data: { ...old.data, data: filtered } };
      });
      return context;
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-3 h-[200px] bg-white p-10 mb-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold capitalize">Bookmarks</h2>
        <p className="text-gray-500">
          Access your favorite W3Schools learning resources in one place.
        </p>
      </div>
      {bookmarks?.length < 1 && (
        <div className="flex flex-col gap-3 h-[300px] bg-white p-10 rounded-lg shadow">
          <NoBookMarks />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 p-10 bg-white rounded-lg shadow md:grid-cols-2 lg:grid-cols-3">
        {bookmarks?.map((bookmark) => (
          <div
            key={bookmark.id}
            onClick={(e) => {
              e.stopPropagation();
              handleReading(bookmark);
            }}
            className="relative p-4 border border-gray-300 rounded-lg cursor-pointer "
          >
            <div className="absolute top-0 right-0 flex items-center gap-3 m-4 z-1">
              {bookmark.isInBookmark && (
                <Bookmark
                  color={bookmark.isInBookmark ? "blue" : "gray"}
                  fill={bookmark.isInBookmark ? "blue" : "transparent"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBookmark(bookmark);
                    setOpenModal(true);
                  }}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className="overflow-hidden rounded-full w-15 h-15">
              <img
                src={
                  "http://localhost:5000/uploads/" +
                  bookmark?.courseThumbnail?.split("\\")[1]
                }
                alt="Course"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-1 pb-6 my-2 text-sm">
              <p className="font-semibold text-gray-500">Lesson</p>
              <h2 className="text-xl font-semibold capitalize">
                {bookmark.subChapter.subChapterTitle}
              </h2>
              <p className="font-semibold text-gray-500">
                {bookmark.courseTitle}
              </p>
            </div>
            <div className="flex justify-between pt-4 text-sm font-semibold text-gray-500 border-t border-gray-300">
              <div className="flex items-center gap-1">
                <i className="pr-1 fa-solid text-md fa-circle-check"></i>
                <p>Not completed</p>
              </div>
              <p>
                <i className="fa fa-calendar"></i> calendar
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedBookmark(null);
        }}
      >
        <div className="flex border-0 bg-white mx-auto mt-20 max-w-[450px] rounded-lg flex-col p-6">
          <h2 className="pb-5 mb-2 text-xl font-bold">Remove Bookmark</h2>
          <p className="pb-6 leading-5 text-black line-clamp-2">
            Are you sure you want to remove &quot;
            {selectedBookmark?.subChapterTitle}&quot; from your bookmarks?
          </p>
          <div className="flex self-end justify-end gap-4">
            <Button
              className="border px-7 py-[1px]  rounded-md border-gray-400"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                mutate({
                  subChapterId: selectedBookmark?.subChapterId,
                  enrollmentId: selectedBookmark?.enrollmentId,
                });
                setOpenModal(false);
                setSelectedBookmark(null);
              }}
              className="text-white bg-red-500 rounded-md px-7"
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const NoBookMarks = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <i className="mb-5 text-5xl text-gray-500 fa fa-bookmark"></i>
      <h3 className="mb-2 text-xl">No bookmarks found</h3>
      <p className="text-gray-400">
        Click the bookmark icon in tutorials to save your favorite tutorials.
        You can see all tutorials here.
      </p>
    </div>
  );
};

export default BookMarks;
