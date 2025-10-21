import { Star, Users } from "lucide-react";
import Button from "../common/Button/Button";

const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript from scratch",
    image: "/web-development-course.png",
    rating: 4.8,
    ratingCount: 2450,
    students: 12500,
    level: "Beginner",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and best practices",
    image: "/react-programming-course.png",
    rating: 4.9,
    ratingCount: 1890,
    students: 8300,
    level: "Advanced",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create beautiful and functional user interfaces",
    image: "/design-course-ui-ux.jpg",
    rating: 4.7,
    ratingCount: 1650,
    students: 9800,
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Full-Stack Development",
    description: "Build complete web applications from frontend to backend",
    image: "/full-stack-development.png",
    rating: 4.9,
    ratingCount: 2100,
    students: 15200,
    level: "Advanced",
  },
];

const renderStars = (rating) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }
        />
      ))}
    </div>
  );
};

export default function FeaturedCourses() {
  return (
    <section id="courses" className="px-4 py-20 md:py-32 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            Featured Courses
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our most popular courses designed by industry experts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col overflow-hidden transition-shadow duration-300 border border-gray-300 bg-card rounded-2xl hover:shadow-lg"
            >
              {/* Course Image */}
              <div className="relative h-40 overflow-hidden bg-muted">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute px-3 py-1 text-xs font-semibold rounded-full top-3 right-3 bg-primary text-primary-foreground">
                  {course.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="mb-2 text-lg font-bold text-foreground line-clamp-2">
                  {course.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(course.rating)}
                    <span className="text-sm font-semibold text-foreground">
                      {course.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({course.ratingCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                  <span className="text-sm font-bold text-primary">FREE</span>
                  <Button className="text-sm rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="px-8 py-6 text-base font-semibold bg-transparent rounded-lg"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
