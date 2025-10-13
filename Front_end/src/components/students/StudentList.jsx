import StudentCard from "./StudentCard";

const students = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    enrolledCourses: 3,
    progress: 85,
    status: "active",
    joinDate: "Jan 2025",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    enrolledCourses: 5,
    progress: 92,
    status: "active",
    joinDate: "Dec 2024",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    enrolledCourses: 2,
    progress: 45,
    status: "active",
    joinDate: "Feb 2025",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    enrolledCourses: 4,
    progress: 68,
    status: "active",
    joinDate: "Nov 2024",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    enrolledCourses: 1,
    progress: 15,
    status: "inactive",
    joinDate: "Mar 2025",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    enrolledCourses: 6,
    progress: 78,
    status: "active",
    joinDate: "Oct 2024",
  },
];

export function StudentsList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
