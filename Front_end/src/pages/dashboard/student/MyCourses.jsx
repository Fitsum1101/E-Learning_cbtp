import { useState } from "react";
import CourseProgress from "../../../components/common/progress/CourseProgess";
import useCustomQuery from "../../../hooks/Query/useCustomQuery";
import Button from "../../../components/common/Button/Button";

const status = {
  ALL: "All Courses",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  SAVED: "Saved",
  NEW_RELEASES: "New Releases",
};

const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState({
    status: status.ALL,
    sortBy: "Recently Accessed",
  });
  console.log(searchTerm);
  const { data: enrollmentCourses } = useCustomQuery(
    "EnrollmentCourses",
    "api/enrollments/courses",
    {
      limit: 10,
    },
    {
      ...searchTerm,
    }
  );

  const handleSearchParams = (param) => {
    setSearchTerm((prev) => ({ ...prev, ...param }));
  };

  return (
    <div>
      <div className="flex flex-col gap-3 h-[200px] bg-white p-10 mb-5 rounded-lg shadow">
        <h2 className="font-bold capitalize text-2xl">Courses</h2>
        <p className="text-gray-500">
          Access your favorite W3Schools learning resources in one place.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {Object.keys(status).map((key) => (
              <Button
                key={key}
                onClick={() => handleSearchParams({ status: key })}
                className={`px-4 py-2 border cursor-pointer border-gray-300 rounded-full text-sm font-medium  ${
                  searchTerm.status === key
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {status[key]}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              onChange={(e) => handleSearchParams({ sortBy: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Recently Accessed">Recently Accessed</option>
              <option value="Alphabetical">Alphabetical</option>
              <option value="Progress">Progress</option>
              <option value="Due Date">Due Date</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-5 w-full">
          <div class="bg-white rounded-xl flex-2/3 shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">Your Courses</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {enrollmentCourses?.map((course, index) => (
                <CourseProgress
                  key={index}
                  title={course.title}
                  progress={course.progress}
                  description={course.description}
                  thumbnail={course.thumbnail}
                  totalLessons={course.totalLessons}
                  completedLessons={course.completedLessons}
                  slug={course.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const courses = [
  { title: "Course 1", progress: 50 },
  { title: "Course 2", progress: 75 },
  { title: "Course 3", progress: 30 },
];

export default MyCourses;
