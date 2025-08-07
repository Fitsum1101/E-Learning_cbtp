import React from "react";
import Button from "../../components/common/Button/Button";

const Courses = () => {
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
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 active">
              All
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Development
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Business
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Design
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Marketing
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Photography
            </button>
            <button className="category-btn px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Music
            </button>
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
          <div className="course-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Web Development"
                className="course-img w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold truncate text-md mb-2 text-gray-800">
                The Complete Web Development Bootcamp
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                libero et nihil ipsam perspiciatis ullam ea inventore esse.
              </p>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="text-gray-600 text-sm ml-2">4.7 (2,345)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">lessons: 25</span>

                <span className="text-sm text-gray-500">
                  <i className="far fa-clock mr-1"></i> 32 hours
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
