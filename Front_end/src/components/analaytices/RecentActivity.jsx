import { Badge, Card, CardContent, CardHeader } from "@mui/material";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "Completed course",
    course: "Advanced Web Development",
    time: "2 minutes ago",
    type: "completion",
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "Enrolled in",
    course: "UI/UX Design Fundamentals",
    time: "15 minutes ago",
    type: "enrollment",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "Earned certificate",
    course: "Digital Marketing Mastery",
    time: "1 hour ago",
    type: "certificate",
  },
  {
    id: 4,
    user: "James Wilson",
    action: "Started quiz",
    course: "Data Science Basics",
    time: "2 hours ago",
    type: "quiz",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    action: "Completed lesson",
    course: "Mobile App Development",
    time: "3 hours ago",
    type: "lesson",
  },
];

export default function RecentActivity() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <h1>Recent Activity</h1>
        <p>Latest user actions and achievements</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full bg-primary/10 text-primary">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user}
                  </p>
                  <Badge variant="secondary">{activity.type}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.action}{" "}
                  <span className="font-medium text-foreground">
                    {activity.course}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
