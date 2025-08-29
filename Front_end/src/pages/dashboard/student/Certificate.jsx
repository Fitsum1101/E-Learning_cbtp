import Button from "../../../components/common/Button/Button";
import {
  Award,
  RotateCcw,
  Calendar,
  FileText,
  Eye,
  BookOpen,
  Download,
} from "lucide-react";

const mockCertificates = [
  {
    id: "1",
    courseTitle: "Advanced React Development",
    completionDate: "2024-01-15",
    grade: "A+",
    status: "completed",
    certificateUrl: "/certificates/react-advanced.pdf",
  },
  {
    id: "2",
    courseTitle: "UI/UX Design Fundamentals",
    completionDate: "2024-02-28",
    grade: "A",
    status: "completed",
    certificateUrl: "/certificates/ux-fundamentals.pdf",
  },
  {
    id: "3",
    courseTitle: "Data Science with Python",
    completionDate: "2024-03-10",
    grade: "B+",
    status: "completed",
    certificateUrl: "/certificates/data-science.pdf",
  },
  {
    id: "4",
    courseTitle: "Digital Marketing Strategy",
    completionDate: "2023-12-05",
    grade: "A-",
    status: "expired",
    certificateUrl: "/certificates/marketing-strategy.pdf",
  },
];

const mockCompletedCourses = [
  {
    id: "5",
    courseTitle: "Machine Learning Basics",
    completionDate: "2024-03-20",
    examAvailable: true,
  },
  {
    id: "6",
    courseTitle: "Web Security Essentials",
    completionDate: "2024-03-15",
    examAvailable: true,
  },
  {
    id: "7",
    courseTitle: "Database Design Principles",
    completionDate: "2024-03-25",
    examAvailable: false,
  },
];

const Certificate = () => {
  const completedCertificates = mockCertificates.filter(
    (cert) => cert.status === "completed"
  );
  const expiredCertificates = mockCertificates.filter(
    (cert) => cert.status === "expired"
  );
  return (
    <div className="">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-balance">
              My Certificates
            </h1>
            <p className="text-gray-600 text-pretty">
              View and manage your course completion certificates
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {completedCertificates.length} Active Certificates
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {mockCompletedCourses.length} Awaiting Certificate Exam
            </span>
          </div>
          {expiredCertificates.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <RotateCcw className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                {expiredCertificates.length} Expired
              </span>
            </div>
          )}
        </div>
      </div>
      {mockCompletedCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Completed Courses - Take Exam for Certificate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockCompletedCourses.map((course) => (
              <CompletedCourse
                day={course.completionDate}
                title={course.courseTitle}
                key={course.id}
              />
            ))}
          </div>
        </div>
      )}
      {mockCertificates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Active Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockCompletedCourses.map((course) => (
              <ActiveCertificates
                day={course.completionDate}
                title={course.courseTitle}
                key={course.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;

const CompletedCourse = ({ title, day }) => (
  <div className="border-1 w-full shadow shadow-gray-200 rounded-xl p-4 bg-white border-gray-400">
    <div className="flex  flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-md font-semibold capitalize">{title}</h2>
      </div>
      <div className="flex items-center gap-2 pb-8 mt-4">
        <Calendar className="text-gray-500 h-4 w-4" />
        <p className="text-sm text-gray-500">Completed March 20, 2024</p>
      </div>
      <div className="pb-5">
        <Button className="bg-blue-600 w-full py-1 text-white items-center justify-center flex gap-2">
          <FileText className="w-4 h-4" />
          <span>Take certificate Exam</span>
        </Button>
      </div>
    </div>
  </div>
);

const ActiveCertificates = ({ title, day }) => (
  <div className="border-1 w-full shadow shadow-gray-200 rounded-xl p-4 bg-white border-gray-400">
    <div className="flex  flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-md font-semibold capitalize">{title}</h2>
        <p className="text-sm text-blue-600 flex items-center justify-center px-2 rounded-md font-semibold bg-blue-200">
          A
        </p>
      </div>
      <div className="flex gap-2 pt-8 pb-4  items-center">
        <Calendar className="text-gray-500 h-4 w-4" />
        <p className="text-sm text-gray-500">Completed March 20, 2024</p>
      </div>
      <div className="flex justify-center pb-4 items-center gap-2">
        <Button className="text-white flex-1/2 rounded-md bg-blue-500  flex justify-center items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>View </span>
        </Button>
        <Button className="text-blue-500 flex-1/2 rounded-md bg-yellow-50 justify-center items-center flex gap-2">
          <Download className="w-4 h-4" />
          <span>Download </span>
        </Button>
      </div>
      <div className="pb-5">
        <Button className=" w-full py-1 hover:bg-gray-100 hover:text-gray-600 text-sm text-gray-500 items-center justify-center flex gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Retake course</span>
        </Button>
      </div>
    </div>
  </div>
);
