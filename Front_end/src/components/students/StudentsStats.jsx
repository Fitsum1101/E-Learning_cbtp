import { Users, UserCheck, UserX, Award } from "lucide-react";
import { Card, CardContent } from "@mui/material";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Students",
    value: "1,089",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Inactive Students",
    value: "159",
    icon: UserX,
    color: "text-orange-600",
  },
  {
    title: "Certificates Issued",
    value: "892",
    icon: Award,
    color: "text-blue-600",
  },
];

export function StudentsStats() {
  return (
    <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
