import { Calendar, Users, Pencil, Eye, Bookmark, Trash2 } from "lucide-react";
import Button from "../../common/Button/Button";
import { Card, CardContent, Badge } from "@mui/material";
import { Link } from "react-router-dom";

export function CourseCard({ courses }) {
  return (
    <div className="overflow-hidden text-gray-700 transition-shadow bg-white border border-gray-200 rounded-md shadow-md shadow-gray-200 hover:shadow-lg">
      <Link href={`/courses/${courses.id}`}>
        <div className="relative w-full overflow-hidden aspect-video bg-muted">
          <img
            src={
              "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg"
            }
            alt={courses.title}
            className="object-cover"
          />
          <h1>what</h1>
        </div>
      </Link>
      <div className="p-6 text-gray-500">
        <Link href={`/courses/${courses.id}`}>
          <h3 className="mb-2 text-xl font-semibold text-black transition-colors hover:text-primary">
            {courses.title}
          </h3>
        </Link>
        <p className="mb-4 text-[16px]">{courses.category}</p>
        <div className="flex items-center text-[13px]  gap-4">
          <div
            variant={courses.status === "Published" ? "default" : "secondary"}
            className={
              courses.status === "Published"
                ? "bg-blue-800 font-semibold text-white p-1 rounded-md"
                : "bg-secondary text-secondary-foreground"
            }
          >
            {courses.status}
          </div>
          <div className="flex items-center gap-1.5 text-[16px] ">
            <Users className="w-4 h-4" />
            <span>{courses.students} Students</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-[16px] ">
          <Calendar className="w-4 h-4" />
          <span>Added {courses.addedDate}</span>
        </div>
      </div>
      <div className="p-4 mb-4 border-t-2 bg-gray-50 border-gray-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Pencil className="w-4 h-4" />
              <span className="sr-only">Edit course</span>
            </Button>
            <Link href={`/courses/${courses.id}`}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Eye className="w-4 h-4" />
                <span className="sr-only">View course</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="w-4 h-4" />
              <span className="sr-only">Bookmark course</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 h-9 w-9 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete course</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
