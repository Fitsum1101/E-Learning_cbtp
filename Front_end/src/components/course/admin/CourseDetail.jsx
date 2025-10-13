import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  useTheme,
} from "@mui/material";
import { BarPlot, ChartContainer, BarChart, LineChart } from "@mui/x-charts";
import {
  Calendar,
  Users,
  Clock,
  BookOpen,
  FileQuestion,
  Award,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const completionData = [
  { month: "Jan", completion: 45, quizScore: 72 },
  { month: "Feb", completion: 52, quizScore: 75 },
  { month: "Mar", completion: 61, quizScore: 78 },
  { month: "Apr", completion: 68, quizScore: 81 },
  { month: "May", completion: 75, quizScore: 84 },
  { month: "Jun", completion: 82, quizScore: 87 },
  { month: "Jul", completion: 88, quizScore: 89 },
  { month: "Aug", completion: 92, quizScore: 91 },
];

const data = [
  { month: "Jan", completions: 50 },
  { month: "Feb", completions: 75 },
  { month: "Mar", completions: 110 },
  { month: "Apr", completions: 145 },
  { month: "May", completions: 160 },
  { month: "Jun", completions: 180 },
  { month: "Jul", completions: 210 },
  { month: "Aug", completions: 260 },
  { month: "Sep", completions: 300 },
  { month: "Oct", completions: 340 },
  { month: "Nov", completions: 360 },
  { month: "Dec", completions: 400 },
];

const lessonsList = [
  {
    id: 1,
    title: "Introduction to the Course",
    duration: "15 min",
    completed: 420,
  },
  {
    id: 2,
    title: "Setting Up Your Environment",
    duration: "30 min",
    completed: 398,
  },
  {
    id: 3,
    title: "Core Concepts and Fundamentals",
    duration: "45 min",
    completed: 385,
  },
  {
    id: 4,
    title: "Hands-on Project: Part 1",
    duration: "60 min",
    completed: 372,
  },
  { id: 5, title: "Advanced Techniques", duration: "50 min", completed: 356 },
];

const quizzesList = [
  { id: 1, title: "Module 1 Quiz", questions: 10, avgScore: 87, attempts: 420 },
  { id: 2, title: "Module 2 Quiz", questions: 15, avgScore: 84, attempts: 398 },
  { id: 3, title: "Module 3 Quiz", questions: 12, avgScore: 89, attempts: 385 },
  {
    id: 4,
    title: "Midterm Assessment",
    questions: 25,
    avgScore: 81,
    attempts: 372,
  },
];

const studentsList = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@example.com",
    progress: 92,
    enrolled: "Sept 1, 2025",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    progress: 88,
    enrolled: "Sept 2, 2025",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james@example.com",
    progress: 95,
    enrolled: "Sept 1, 2025",
  },
  {
    id: 4,
    name: "Sophie Chen",
    email: "sophie@example.com",
    progress: 78,
    enrolled: "Sept 3, 2025",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    progress: 85,
    enrolled: "Sept 2, 2025",
  },
];

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const AdminCourseDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const theme = useTheme();

  // Example: average scores per month
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const scores = [75, 82, 78, 85, 88, 92, 80, 87, 90, 93, 89, 95];
  const completions = [
    50, 75, 110, 145, 160, 180, 210, 260, 300, 340, 360, 400,
  ];

  const { id } = useParams();

  const courseIndex = lessonsList.findIndex((les) => les.id === +id);

  if (courseIndex === -1) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-red-700 text-9xl">
        <h1>course does not found</h1>
      </div>
    );
  }

  const course = lessonsList[courseIndex];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/">
        <button className="flex items-center gap-2 py-2 text-sm font-semibold text-black ">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>
      </Link>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="relative w-full overflow-hidden rounded-lg aspect-video lg:w-80">
              <img
                src={
                  "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"
                }
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-foreground">
                    {course.title}
                  </h1>
                  <p className="text-muted-foreground">
                    Master modern web development with this comprehensive
                    bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and
                    more. Build real-world projects and launch your career as a
                    full-stack developer
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-transparent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div
                  className={
                    true
                      ? "bg-blue-800  font-semibold text-white px-1 rounded-lg"
                      : "bg-secondary text-secondary-foreground"
                  }
                >
                  Published
                </div>
                <div className="flex items-center gap-1.5 text-sm ">
                  <Users className="w-4 h-4" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm ">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm ">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <FileQuestion className="w-4 h-4" />
                  <span>{course.quizzes} Quizzes</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>{course.certificates} Certificates</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Added Sept 2025</span>
                <span className="mx-2">•</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h1>Course Insights</h1>
          <p>Student progress and quiz performance over time</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <LineChart
                // width={850}
                height={420}
                xAxis={[
                  {
                    dataKey: "month",
                    label: "Month",
                    scaleType: "band", // <--- important: use band scale for categories
                  },
                ]}
                yAxis={[
                  {
                    label: "Completed Students",
                  },
                ]}
                series={[
                  {
                    dataKey: "completions",
                    label: "Student Completions",
                    area: true,
                    color: theme.palette.primary.main,
                  },
                ]}
                dataset={data} // <--- this links data to xAxis and series
                grid={{ horizontal: true }}
                sx={{
                  "& .MuiChartsAxis-tickLabel": {
                    fill: theme.palette.text.primary,
                  },
                  "& .MuiChartsAxis-line": {
                    stroke: theme.palette.divider,
                  },
                  "& .MuiChartsLegend-label": {
                    fill: theme.palette.text.primary,
                  },
                }}
              />
            </div>
            <div>
              <BarChart
                xAxis={[
                  {
                    id: "months",
                    data: months,
                    scaleType: "band",
                    label: "Months",
                  },
                ]}
                height={400}
                width={500}
                spacing={10}
                // extra pixel gap between bars in same category
                series={[
                  {
                    data: scores,
                    label: "Average Score",
                    color: theme.palette.primary.main,
                  },
                ]}
                yAxis={[{ label: "Average Score (%)" }]}
                grid={{ horizontal: true }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid  bg-[#ECF3F8] px-2 w-full grid-cols-3 lg:grid-cols-6">
        <button className="text-gray-800 bg-white rounded-lg " value="overview">
          Overview
        </button>
        <button value="lessons">Lessons</button>
        <button value="quizzes">Quizzes</button>
        <button value="students">Students</button>
        <button value="certificates">Certificates</button>
        <button value="settings">Settings</button>
      </div>
      <Card>
        {false && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              desc={"Course Overview"}
              lessons={"General information about this course"}
            />
            <p className="pb-5"></p>
            <div className="pb-4">
              <h3 className="font-semibold text-black text-md">Description</h3>
              <p>
                Master modern web development with this comprehensive bootcamp.
                Learn HTML, CSS, JavaScript, React, Node.js, and more. Build
                real-world projects and launch your career as a full-stack
                developer.
              </p>
            </div>
            <div>
              <h3 className="pb-2 font-semibold text-black text-md">
                What You'll Learn
              </h3>
              <ul className="pl-4 list-disc">
                <li>Master the fundamentals and advanced concepts</li>
                <li>Build real-world projects from scratch</li>
                <li>Learn industry best practices and workflows</li>
                <li>Get hands-on experience with modern tools</li>
              </ul>
            </div>
            <div>
              <h3 className="pb-2 text-lg font-semibold text-black">
                Requirements
              </h3>
              <ul className="pl-4 list-disc">
                <li>Basic computer skills</li>
                <li>Passion for learning</li>
                <li>No prior experience required</li>
              </ul>
            </div>
          </div>
        )}
        {false && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              desc={"All lessons in this course"}
              lessons={"Course Lessons"}
            />
            <div className="flex flex-col gap-4">
              <Lesson
                number={1}
                title={"Introduction to the Course"}
                completedStudents={200}
                time={10}
              />
            </div>
          </div>
        )}
        {false && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              desc={"All quizzes and assessments"}
              lessons={"Course Quizzes"}
            />
            <div className="flex flex-col gap-4">
              <Queszies />
            </div>
          </div>
        )}
        {false && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              desc={"Students currently taking this course"}
              lessons={"Enrolled Students"}
            />
            <div className="flex flex-col gap-4">
              <Students />
            </div>
          </div>
        )}
        {false && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              lessons={"Certificatess"}
              desc={"Certificate settings and issued certificates"}
            />
            <div className="flex items-center w-full gap-3 p-3 border border-gray-300 rounded-md">
              <div className="flex flex-col justify-between w-full">
                <h3 className="font-semibold text-black text-md">
                  Certificate Enabled
                </h3>
                <div className="flex justify-between">
                  <p className="pb-5 text-sm">
                    Students receive a certificate upon completion
                  </p>
                  <p className="px-2 text-sm text-white bg-blue-900 rounded-sm self-baseline">
                    active
                  </p>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                  <CertifcateResult number={"385"} text={"Total Issued"} />
                  <CertifcateResult number={"92%"} text={"Completion Rate"} />
                  <CertifcateResult number={"10w"} text={"Avg Time"} />
                </div>
              </div>
            </div>
          </div>
        )}
        {true && (
          <div className="p-6 text-gray-600 ">
            <ReviewHeader
              desc={"Manage course configuration and preferences"}
              lessons={"Course Settings"}
            />
            <div>
              <h3 className="font-semibold text-black">Course Status</h3>
              <div className="flex gap-2 py-2">
                <button className="px-4 py-2 text-sm font-semibold text-white capitalize bg-blue-800 border-blue-800 rounded-md">
                  Publised
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-gray-900 capitalize bg-blue-100 border-blue-800 rounded-md hover:bg-blue-200">
                  draft
                </button>
              </div>
            </div>
            <div className="py-2">
              <h3 className="font-semibold text-black">Course Category</h3>
              <p>Web Dev</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">duration</h3>
              <p>12 min</p>
            </div>
            <div className="flex gap-2 pt-5 mt-6 border-t border-gray-200">
              <button className="px-2 py-2 text-sm font-semibold text-white capitalize bg-blue-800 border-blue-800 rounded-md">
                save changes
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-gray-900 capitalize bg-blue-100 border-blue-800 rounded-md hover:bg-blue-200">
                cancel
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const Lesson = ({ number, title, completedStudents, time }) => {
  return (
    <div className="flex items-center w-full gap-3 p-3 border border-gray-300 rounded-md ">
      <p className="flex items-center justify-center w-10 h-10 text-blue-700 bg-blue-100 rounded-full">
        {number}
      </p>
      <div className="flex-1">
        <div className="flex justify-between ">
          <h3 className="font-semibold text-black text-md">{title}</h3>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {completedStudents} completed
          </div>
        </div>
        <p>{time} min</p>
      </div>
    </div>
  );
};

const Queszies = () => {
  return (
    <div className="flex items-center w-full gap-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 ">
      <div className="flex justify-between w-full ">
        <div>
          <h3 className="font-semibold text-black">Module 1 Quiz</h3>
          <p>10 questions</p>
        </div>
        <div className="flex gap-2 text-sm font-semibold text-black ">
          <div className="flex flex-col ">
            <p>Avg Score</p>
            <span className="self-end text-xl text-blue-700">80%</span>
          </div>
          <div className="flex flex-col">
            <p>Attempts</p>
            <span className="text-xl text-right">420</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewHeader = ({ lessons, desc }) => {
  return (
    <>
      <h3 className="font-semibold text-black text-md">{lessons}</h3>
      <p className="pb-5 text-sm">{desc}</p>
    </>
  );
};

const Students = () => {
  return (
    <div className="flex items-center w-full gap-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 ">
      <div className="flex justify-between w-full">
        <div>
          <h3 className="font-semibold text-black">Alex Thompson</h3>
          <div className="flex flex-col">
            <p>alex@example.com</p>
            <p className="-mt-2">Enrolled: Sept 1, 2025</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-black ">Progress</p>
          <p className="-mt-1 text-lg font-semibold text-right text-blue-700">
            92%
          </p>
        </div>
      </div>
    </div>
  );
};

const CertifcateResult = ({ text, number }) => {
  return (
    <div className="flex items-center justify-between w-full p-3 rounded-md md:items-start md:flex-col bg-blue-50">
      <p className="text-sm">{text}</p>
      <p className="text-2xl font-semibold text-blue-800">{number}</p>
    </div>
  );
};

export default AdminCourseDetail;
