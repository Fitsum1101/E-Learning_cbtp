import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Button from "../../../components/common/Button/Button";

const BookMarks = () => {
  const queryClient = useQueryClient();

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

  const [openModal, setOpenModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

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
        <h2 className="font-bold capitalize text-2xl">Bookmarks</h2>
        <p className="text-gray-500">
          Access your favorite W3Schools learning resources in one place.
        </p>
      </div>
      {bookmarks?.length < 1 && (
        <div className="flex flex-col gap-3 h-[300px] bg-white p-10 rounded-lg shadow">
          <NoBookMarks />
        </div>
      )}
      <div className="grid grid-cols-1  bg-white p-10 rounded-lg shadow md:grid-cols-2 lg:grid-cols-3  gap-4">
        {bookmarks?.map((bookmark) => (
          <div
            key={bookmark.id}
            className="border relative p-4 border-gray-300 rounded-lg   "
          >
            <div className="absolute right-0 top-0 m-4 flex items-center gap-3">
              <i
                onClick={() => {
                  setSelectedBookmark(bookmark);
                  setOpenModal(true);
                }}
                className={`fa-solid text-xl cursor-pointer ${
                  bookmark.isInBookmark ? "text-blue-500" : "text-gray-500"
                } fa-bookmark`}
              ></i>
            </div>
            <div className="w-15  h-15  rounded-full overflow-hidden">
              <img
                src={
                  "http://localhost:5000/uploads/" +
                  bookmark?.courseThumbnail?.split("\\")[1]
                }
                alt="Course"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col pb-6 text-sm my-2 gap-1">
              <p className="text-gray-500 font-semibold">Lesson</p>
              <h2 className="text-xl font-semibold capitalize">
                {bookmark.subChapterTitle}
              </h2>
              <p className="text-gray-500 font-semibold">
                {bookmark.courseTitle}
              </p>
            </div>
            <div className="flex text-gray-500 border-t pt-4  border-gray-300  text-sm font-semibold justify-between">
              <div className="flex items-center gap-1">
                <i className="fa-solid text-md  pr-1 fa-circle-check"></i>
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
          <h2 className="text-xl pb-5 mb-2 font-bold">Remove Bookmark</h2>
          <p className="text-black line-clamp-2 pb-6 leading-5">
            Are you sure you want to remove &quot;
            {selectedBookmark?.subChapterTitle}&quot; from your bookmarks?
          </p>
          <div className="flex justify-end gap-4 self-end">
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
              className="bg-red-500 px-7 rounded-md text-white"
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
    <div className="flex items-center justify-center flex-col h-full">
      <i className="fa text-5xl mb-5 text-gray-500 fa-bookmark"></i>
      <h3 className="text-xl mb-2">No bookmarks found</h3>
      <p className="text-gray-400">
        Click the bookmark icon in tutorials to save your favorite tutorials.
        You can see all tutorials here.
      </p>
    </div>
  );
};

export default BookMarks;
