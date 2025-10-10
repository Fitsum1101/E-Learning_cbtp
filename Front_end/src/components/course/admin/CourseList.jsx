import { CourseCard } from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Course Title",
    category: "Web Dev",
    status: "Published",
    students: 420,
    addedDate: "Sept 2025",
    image: "web-development-course.png",
  },
  {
    id: 2,
    title: "Course Title",
    category: "Design",
    status: "Published",
    students: 420,
    addedDate: "Sept 2025",
    image: "design-course-concept.png",
  },
  {
    id: 3,
    title: "Course Title",
    category: "Design",
    status: "Published",
    students: 420,
    addedDate: "Sept 2025",
    image: "graphic-design-course.png",
  },
  {
    id: 4,
    title: "Course Title",
    category: "Draft",
    status: "Draft",
    students: 230,
    addedDate: "Sept 2025",
    image: "online-course-concept.png",
  },
];

export function CoursesList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} courses={course} />
      ))}
    </div>
  );
}
