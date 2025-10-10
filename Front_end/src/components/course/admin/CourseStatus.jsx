import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@mui/material";

const stats = [
  {
    icon: BookOpen,
    label: "Total Courses",
    value: "120",
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
  {
    icon: CheckCircle2,
    label: "Published",
    value: "85",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    label: "Drafts",
    value: "35",
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
];
export function CoursesStats() {
  return (
    <div className="grid gap-4 mb-8 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border">
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
