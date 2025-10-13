import { BookOpen, Users, Award, UserPlus, Activity } from "lucide-react";
import { Card, CardContent } from "@mui/material";

const stats = [
  {
    title: "Total Students",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Courses",
    value: "120",
    change: "+8.2%",
    icon: BookOpen,
    trend: "up",
  },
  {
    title: "Certificates Issued",
    value: "1,234",
    change: "+15.3%",
    icon: Award,
    trend: "up",
  },
  {
    title: "Total Enrollments",
    value: "8,456",
    change: "+18.7%",
    icon: UserPlus,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "1,892",
    change: "+5.4%",
    icon: Activity,
    trend: "up",
  },
];

export function AnalyticsStats() {
  return (
    <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-card">
            <CardContent className="flex flex-row items-center justify-between p-6 md:flex-col md:items-baseline">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
