import { useState } from "react";

import useCustomQuery from "../../hooks/Query/useCustomQuery";
import SingleCours from "../../components/course/SingleCours";
import Profile from "../../components/common/Avater/Profile";

const Courses = () => {
  const [selectPage, setSelectPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState({
    slug: "All",
    id: "All",
  });

  const { data: category } = useCustomQuery("categories", "api/categories");

  const { data: courses } = useCustomQuery("courses", "/api/courses/category", {
    categoryId: selectedCategory.id,
    page: selectPage,
    limit: 12,
  });

  const handlePageSelection = (page) => setSelectPage(page);

  if (typeof category === "object")
    if (category.findIndex((cat) => cat.slug === "All") === -1) {
      category?.unshift({ id: "All", name: "All", slug: "All" });
    }

  return (
    <div>
      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Expand Your Knowledge</h1>
            <p className="text-xl mb-8">
              Browse through our extensive collection of courses and start
              learning today
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search courses..."
                className="search-input bg-white w-full py-3 px-6 rounded-full text-gray-800 focus:ring-2 focus:ring-indigo-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-700 text-white p-2 rounded-full hover:bg-indigo-800">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Profile />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {category?.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory({ slug: cat.slug, id: cat.id })
                }
                className={`category-btn cursor-pointer  px-4 py-2  rounded-full  ${
                  selectedCategory.slug === cat.slug
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-gray-600">
            Showing <span className="font-medium">12</span> of
            <span className="font-medium">86</span> courses
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label for="sort" className="mr-2 text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
              </select>
            </div>
            <div className="flex items-center">
              <label for="level" className="mr-2 text-gray-600">
                Level:
              </label>
              <select
                id="level"
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses?.courses?.map((cou) => (
            <SingleCours
              key={cou.id}
              id={cou.id}
              title={cou.title}
              description={cou.description}
              thumbnail={cou.thumbnail}
              slug={cou.slug}
            />
          ))}
        </div>
        <div class="flex justify-center mt-12">
          <nav class="flex items-center gap-1">
            {courses?.pages?.startPage !== courses?.pages?.currentPage && (
              <button
                onClick={() => handlePageSelection(1)}
                class="px-4 py-2 border cursor-pointer  hover:bg-gray-100"
              >
                1
              </button>
            )}
            {courses?.pages?.prevPage - courses?.pages?.startPage > 2 && (
              <button
                onClick={() =>
                  handlePageSelection(courses?.pages?.prevPage - 1)
                }
                class="px-4 py-2 border cursor-pointer  hover:bg-gray-100"
              >
                ...
              </button>
            )}
            {courses?.pages?.currentPage === 4 && (
              <button
                onClick={() => handlePageSelection(courses?.pages?.prevPage)}
                class="px-4 py-2 border cursor-pointer  hover:bg-gray-100"
              >
                {courses?.pages?.prevPage - 1}
              </button>
            )}
            {courses?.pages?.prevPage !== courses?.pages?.startPage &&
              courses?.pages?.prevPage && (
                <button
                  onClick={() => handlePageSelection(courses?.pages?.prevPage)}
                  class="px-4 py-2 cursor-pointer  border hover:bg-gray-100"
                >
                  {courses?.pages?.prevPage}
                </button>
              )}
            {courses?.pages?.currentPage && (
              <button
                onClick={() => handlePageSelection(courses?.pages?.currentPage)}
                class="px-4 py-2 bg-indigo-600 border-t border-b border-r  text-white"
              >
                {courses?.pages?.currentPage}
              </button>
            )}
            {courses?.pages?.nextPage < courses?.pages?.endPage && (
              <button
                onClick={() => handlePageSelection(courses?.pages?.nextPage)}
                class="px-4 py-2 cursor-pointer  border hover:bg-gray-100"
              >
                {courses?.pages?.nextPage}
              </button>
            )}
            {courses?.pages?.currentPage === 10 && (
              <button
                onClick={() => handlePageSelection(courses?.pages?.nextPage)}
                class="px-4 cursor-pointer  py-2 border hover:bg-gray-100"
              >
                {courses?.pages?.nextPage + 1}
              </button>
            )}
            {courses?.pages?.endPage - courses?.pages?.nextPage > 2 && (
              <button class="px-4 py-2   border space-x-10">...</button>
            )}
            {courses?.pages?.currentPage !== courses?.pages?.endPage && (
              <button
                onClick={() => handlePageSelection(courses?.pages?.endPage)}
                class="px-4 py-2 cursor-pointer  border hover:bg-gray-100"
              >
                {courses?.pages?.endPage}
              </button>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Courses;
