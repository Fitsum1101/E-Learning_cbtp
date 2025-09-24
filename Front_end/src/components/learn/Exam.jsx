import { Card, CardContent } from "@mui/material";
import Button from "../common/Button/Button";
import {
  AlertCircle,
  Badge,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Timer,
  Users,
} from "lucide-react";

const mockExamData = {
  courseTitle: "React Fundamentals",
  examTitle: "Final Assessment",
  courseImage: "/react-programming-course-illustration-with-modern-.jpg",
  courseDescription:
    "Master the fundamentals of React development including hooks, components, and state management",
  instructor: "Dr. Sarah Johnson",
  difficulty: "Intermediate",
  timeLimit: 30, // minutes
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance of React applications",
        "To handle routing in React applications",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Which hook is used to manage component state in functional components?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What does the useEffect hook do?",
      options: [
        "Manages component state",
        "Handles side effects and lifecycle events",
        "Creates context for components",
        "Optimizes component rendering",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "What is JSX?",
      options: [
        "A new programming language",
        "A JavaScript library",
        "A syntax extension for JavaScript",
        "A CSS framework",
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "How do you pass data from parent to child components?",
      options: ["Using state", "Using props", "Using context", "Using refs"],
      correctAnswer: 1,
    },
  ],
};

const examInfo = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time Management",
    description:
      "You have {30} minutes to complete all questions. The exam will auto-submit when time expires.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Navigation",
    description:
      "You can navigate between questions freely and change your answers before submitting.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Submission",
    description:
      "All questions must be answered before you can submit the exam.",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Academic Integrity",
    description:
      "This is an individual assessment. No external resources or collaboration allowed.",
  },
];

const Exam = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden border-blue-200 shadow-xl">
          <div className="relative text-white bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="text-white bg-white/20 border-white/30 hover:bg-white/30">
                      {mockExamData.difficulty}
                    </Badge>
                  </div>
                  <h1 className="mb-3 text-3xl font-bold md:text-4xl text-balance">
                    {mockExamData.examTitle}
                  </h1>
                  <p className="flex items-center gap-2 mb-4 text-xl text-blue-100">
                    <BookOpen className="w-5 h-5" />
                    {mockExamData.courseTitle}
                  </p>
                  <p className="mb-4 text-blue-100 text-pretty">
                    {mockExamData.courseDescription}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {mockExamData.instructor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      {mockExamData.timeLimit} minutes
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                    <img
                      src={mockExamData.courseImage || "/placeholder.svg"}
                      alt="Course illustration"
                      className="relative object-cover h-48 border-4 shadow-2xl w-80 rounded-2xl border-white/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-8 bg-white md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Exam Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-3 mb-6 text-xl font-bold text-blue-900">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    Exam Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                        <Timer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">
                          Time Limit
                        </div>
                        <div className="text-blue-700">
                          {mockExamData.timeLimit} minutes total
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">
                          Total Questions
                        </div>
                        <div className="text-blue-700">
                          {mockExamData.questions.length} multiple-choice
                          questions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">
                          Passing Score
                        </div>
                        <div className="text-blue-700">
                          70% or higher required
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Rules */}
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-3 mb-6 text-xl font-bold text-blue-900">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    Exam Rules & Guidelines
                  </h3>
                  <div className="space-y-4">
                    {examInfo.map((rule, index) => (
                      <ExamRules
                        key={index}
                        icon={rule.icon}
                        title={rule.title}
                        description={rule.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 mt-10 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="mb-2 text-lg font-bold text-yellow-800">
                    Important Notice
                  </div>
                  <div className="text-yellow-700 text-pretty">
                    Once you start the exam, the timer will begin immediately.
                    Make sure you have a stable internet connection and are in a
                    quiet environment. You cannot pause the exam once started.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <div className="mb-6">
                <h4 className="mb-3 text-xl font-bold text-blue-900">
                  Ready to Begin?
                </h4>
                <p className="mb-2 text-blue-700">
                  Take your time to review the information above, then click
                  below to start your exam.
                </p>
                <p className="text-sm text-blue-600">
                  Remember: You have {mockExamData.timeLimit} minutes to
                  complete {20} questions
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex items-center justify-center px-12 py-4 text-lg font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Start Exam Now
                </Button>
                <div className="max-w-xs text-xs text-blue-500 text-pretty">
                  By starting this exam, you agree to follow all academic
                  integrity guidelines
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPage;

function ExamRules({ icon, title, description }) {
  return (
    <div className="p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
      <div className="flex items-center gap-2 mb-2 font-semibold text-blue-900">
        {icon}
        {title}
      </div>
      <div className="text-sm text-blue-700 text-pretty">{description}</div>
    </div>
  );
}
