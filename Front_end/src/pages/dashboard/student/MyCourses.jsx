import CourseProgress from "../../../components/common/progress/CourseProgess";

const MyCourses = () => {
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
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
              All Courses
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
              In Progress
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
              Completed
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
              Saved
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
              New Releases
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Recently Accessed</option>
              <option>Alphabetical</option>
              <option>Progress</option>
              <option>Due Date</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {courses.map((course, index) => (
            <CourseProgress
              key={index}
              course={course.title}
              progress={course.progress}
            />
          ))}
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
