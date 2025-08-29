import { Link } from "react-router-dom";

import Profile from "../../../components/common/Avater/Profile";
import CourseProgress from "../../../components/common/progress/CourseProgess";
import Certificate from "../../../components/common/progress/Certificate";
import ModalLesson from "../../../ui/Modal/ModalLesson";
import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Modal from "@mui/material/Modal";
import useCustomQuery from "../../../hooks/Query/useCustomQuery";

const StudentDashboard = () => {
  const [openStudentAvatarModal, setOpenStudentAvatarModal] = useState(false);

  const { data: enrollmentCourses } = useCustomQuery(
    "EnrollmentCourses",
    "api/enrollments/courses"
  );

  return (
    <div>
      <div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
              <p className="opacity-90">
                Continue your learning journey. You're making great progress!
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-200">
              Explore Courses
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Enrolled Courses</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
              </div>
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <i className="fas fa-book text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Completed Courses</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Certificates Earned</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i className="fas fa-certificate text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Learning Streak</p>
                <h3 className="text-2xl font-bold mt-1">7 days</h3>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <i className="fas fa-fire text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <div className="bg-white flex-1/2   rounded-2xl">
            <div className="bg-[#FAFAFA] h-[180px] border border-amber-100 rounded-2xl flex m-5 flex-col  justify-center items-center">
              <Profile size={130} seed={"Eiden"} className=" p-1" />
              <Link
                className="text-sm text-blue-500 border-b-2 border-blue-500"
                onClick={() => setOpenStudentAvatarModal(true)}
              >
                Edit Avatar
              </Link>
            </div>
            <div>
              <p className="text-md font-bold ml-5 mb-5  ">CoolNinja8761</p>
            </div>
          </div>
          <div className="bg-white flex-1/2 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Certificates
              </h2>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                View All
              </a>
            </div>
            <div className="space-y-4">
              <Certificate title="Python Programming" date="May 2, 2023" />
              <Certificate title="JavaScript Basics" date="April 15, 2023" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div class="bg-white rounded-xl flex-2/3 shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">
                Your Course Progress
              </h2>
              <a href="#" class="text-indigo-600 hover:text-indigo-800">
                View All
              </a>
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
      {openStudentAvatarModal && (
        <StudentAvatarModal
          open={true}
          onClose={() => setOpenStudentAvatarModal(false)}
        />
      )}
    </div>
  );
};

const courses = [
  { title: "Course 1", progress: 50 },
  { title: "Course 2", progress: 75 },
];

const seeds = [
  "lion123",
  "tiger456",
  "eagle789",
  "bear321",
  "fox654",
  "wolf987",
  "panda111",
  "dragon222",
];

const style = "Adventurer";

export default StudentDashboard;

const StudentAvatarModal = ({ open, onClose }) => {
  const { data: avatars } = useCustomQuery("avatar", "/api/avatar");

  return (
    <Modal open={open} onClose={onClose}>
      <div className=" p-10  rounded-md   overflow-y-scroll gap-2 mx-auto absolute translate-y-[-50%] top-1/2 left-1/2 transform -translate-x-1/2  max-h-[90vh] w-[1024px] bg-white items-center">
        <div className="ml-5 border-b-1 z-10 sticky left-0 top-0 pb-2 flex justify-between items-center border-gray-400">
          <h1 className="text-xl font-bold text-black">Edit Avater</h1>
          <div className="flex text-[12px] font-bold  gap-3">
            {collection.map((style) => (
              <p className="cursor-pointer capitalize ">{style}</p>
            ))}
          </div>
        </div>
        <div className="flex mt-10   gap-10 justify-between">
          <div className="bg-[#f8f8f8] border-amber-100 border  rounded-md  flex flex-col justify-center items-center flex-1/3 max-h-[70vh]">
            <Profile size={300} seed={"Chase"} className=" p-1" />
            <Button>Apply</Button>
          </div>
          <div className="grid md:grid-cols-2 overflow-y-scroll max-h-[80vh]  lg:grid-cols-3 gap-5 ">
            {avatars?.map((avatar) => (
              <ProfileCart
                key={avatar.id}
                size={100}
                seed={avatar.seed}
                style={avatar?.AvatarCategory?.style}
                className=" p-1"
              />
            ))}
          </div>
        </div>
        {/* <Button onClick={onClose}>Close</Button> */}
      </div>
    </Modal>
  );
};

const collection = [
  "adventurer",
  "croodles",
  "adventurer-neutral",
  "avataaars-neutral",
  "avataaars",
  "micah",
  "initials",
  "pixelArt",
  "bottts",
];

const ProfileCart = ({ seed, size, style }) => {
  return (
    <div className="flex flex-col p-10 border-1 border-gray-300 items-center rounded-md justify-center">
      <Profile size={size} style={style} seed={seed} className="" />
      <p className="capitalize font-bold text-md">{seed}</p>
      <p className="text-sm text-gray-500">free {seed}</p>
    </div>
  );
};
