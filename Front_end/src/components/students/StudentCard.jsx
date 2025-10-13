import { Eye, Edit, Trash2, BookOpen } from "lucide-react";
import { Card, CardContent, Badge, LinearProgress } from "@mui/material";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";

export default function StudentCard({ student }) {
  return (
    <Card className="w-full overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={student.avatar || "/placeholder.svg"}
            alt={student.name}
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate text-foreground">
              {student.name}
            </h3>
            <p className="text-sm truncate text-muted-foreground">
              {student.email}
            </p>
            <Badge
              variant={student.status === "active" ? "default" : "secondary"}
              className="mt-2"
            >
              {student.status}
            </Badge>
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              Enrolled Courses
            </span>
            <span className="font-medium text-foreground">
              {student.enrolledCourses}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{student.progress}%</span>
            </div>
            <LinearProgress
              value={student.progress}
              className="h-2 pt-2 bg-blue-500 rounded-md "
              variant="determinate"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-medium text-foreground">
              {student.joinDate}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Link to={`${student.id}`} className="flex-1">
            <Button className="flex items-center justify-center w-full gap-2 border border-gray-200">
              <Eye className="w-4 h-4" />
              View
            </Button>
          </Link>
          <Button className="p-1 border border-gray-200 bg-blue-50">
            <Edit className="w-4 h-4" />
          </Button>
          <Button className="p-1 border border-gray-200 bg-blue-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
