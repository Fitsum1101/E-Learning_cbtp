import React from "react";

const BookMarks = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 h-[200px] bg-white p-10 mb-5 rounded-lg shadow">
        <h2 className="font-bold capitalize text-2xl">Bookmarks</h2>
        <p className="text-gray-500">
          Access your favorite W3Schools learning resources in one place.
        </p>
      </div>
      <div className="flex flex-col gap-3 h-[300px] bg-white p-10 rounded-lg shadow">
        <NoBookMarks />
      </div>
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
