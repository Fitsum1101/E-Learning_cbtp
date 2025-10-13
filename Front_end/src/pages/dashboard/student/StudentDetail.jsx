import {
  ArrowLeft,
  Mail,
  Calendar,
  BookOpen,
  Award,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Badge,
  useTheme,
  LinearProgress,
} from "@mui/material";
import Button from "../../../components/common/Button/Button";
import { LineChart } from "@mui/x-charts";

const progressData = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 45 },
  { month: "Apr", progress: 60 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 85 },
];

const enrolledCourses = [
  {
    id: "1",
    title: "Advanced Web Development",
    progress: 85,
    status: "In Progress",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    progress: 92,
    status: "In Progress",
  },
  { id: "3", title: "JavaScript Mastery", progress: 100, status: "Completed" },
];

const data = [
  { month: "Jan", progress: 40 },
  { month: "Feb", progress: 55 },
  { month: "Mar", progress: 62 },
  { month: "Apr", progress: 68 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 78 },
  { month: "Jul", progress: 82 },
  { month: "Aug", progress: 85 },
  { month: "Sep", progress: 87 },
  { month: "Oct", progress: 90 },
  { month: "Nov", progress: 93 },
  { month: "Dec", progress: 95 },
];

const certificates = [
  {
    id: "1",
    course: "JavaScript Mastery",
    issueDate: "May 2025",
    certificateId: "CERT-2025-001",
  },
  {
    id: "2",
    course: "React Fundamentals",
    issueDate: "Apr 2025",
    certificateId: "CERT-2025-002",
  },
];

const activities = [
  { id: "1", action: "Completed lesson: Advanced Hooks", time: "2 hours ago" },
  { id: "2", action: "Submitted quiz: React Components", time: "5 hours ago" },
  { id: "3", action: "Started course: UI/UX Design", time: "1 day ago" },
  {
    id: "4",
    action: "Earned certificate: JavaScript Mastery",
    time: "3 days ago",
  },
];

export default function StudentDetailPage({ studentId }) {
  const theme = useTheme();
  const student = {
    id: studentId,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "active",
    joinDate: "Jan 15, 2025",
    totalCourses: 3,
    completedCourses: 1,
    certificates: 2,
    overallProgress: 85,
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="students">
          <Button variant="ghost" className="flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Students
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <img
              src={student.avatar || "/placeholder.svg"}
              alt={student.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-foreground">
                    {student.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {student.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {student.joinDate}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    student.status === "active" ? "default" : "secondary"
                  }
                  className="w-fit"
                >
                  {student.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold text-foreground">
                    {student.totalCourses}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {student.completedCourses}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold text-foreground">
                    {student.certificates}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Overall Progress
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {student.overallProgress}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <LineChart
          dataset={data}
          width={850}
          height={420}
          xAxis={[
            {
              dataKey: "month",
              scaleType: "band",
              label: "Month",
            },
          ]}
          yAxis={[
            {
              label: "Average Progress (%)",
              min: 0,
              max: 100,
            },
          ]}
          series={[
            {
              dataKey: "progress",
              label: "Learning Progress",
              color: theme.palette.primary.main,
              showMark: true, // ✅ shows only the points
              area: false,
            },
          ]}
          // hide connecting line
          sx={{
            "& .MuiLineElement-root": {
              strokeWidth: 0, // hides the line completely
            },
            "& .MuiMarkElement-root": {
              r: 6, // size of points
              strokeWidth: 2,
              fill: theme.palette.primary.main,
              stroke: theme.palette.background.paper,
            },
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
          grid={{ horizontal: true }}
        />
      </Card>
      <div className="p-2 bg-blue-50 ">
        <Button className="bg-white border border-blue-200 rounded-md">
          Enrolled Courses
        </Button>
        <Button>Certificates</Button>
        <Button>Activity</Button>
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <Card>
          <div className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Advanced Web Development
                    </h3>
                  </div>
                  <Button className="py-[2px] px-1 rounded-md text-sm text-white bg-blue-600">
                    Completed
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{90}%</span>
                  </div>
                  <LinearProgress
                    value={90}
                    className="h-2 pt-2 bg-blue-500 rounded-md "
                    variant="determinate"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Advanced Web Development
                    </h3>
                  </div>
                  <Button className="py-[2px] px-1 rounded-md text-sm text-white bg-blue-600">
                    Completed
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{90}%</span>
                  </div>
                  <LinearProgress
                    value={90}
                    className="h-2 pt-2 bg-blue-500 rounded-md "
                    variant="determinate"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Award className="w-6 h-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-foreground">
                    Advanced Web Development
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Issued on: May 2025
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Certificate ID: CERT-2025-001
                  </p>
                </div>
                <Button className="border border-gray-300 bg-gray-50">
                  Download
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-200 rounded-full">
                  <Activity className="w-4 h-4 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Advanced Hooks
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    2 hours ag
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
