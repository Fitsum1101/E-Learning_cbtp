import { CoursesHeader } from "../../../components/course/admin/CourseHeader";
import { CoursesList } from "../../../components/course/admin/CourseList";
import { CoursesStats } from "../../../components/course/admin/CourseStatus";

const Course = () => {
  return (
    <div>
      <CoursesHeader />
      <CoursesStats />
      <CoursesList />
    </div>
  );
};

export default Course;
