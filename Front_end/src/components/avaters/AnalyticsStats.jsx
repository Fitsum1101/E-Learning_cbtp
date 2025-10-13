import { Card } from "@mui/material";
import { Users, CheckCircle, Lock } from "lucide-react";

const stats = [
  {
    title: "Total Avatars",
    value: "48",
    icon: Users,
    change: "+4 this month",
  },
  {
    title: "Active Avatars",
    value: "32",
    icon: CheckCircle,
    change: "Available to unlock",
  },
  {
    title: "Locked Avatars",
    value: "16",
    icon: Lock,
    change: "Require achievements",
  },
];
export default function AvatarsStats() {
  return (
    <div className="grid gap-4 mb-8 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex justify-between md:flex-col md:justify-baseline">
              <div className="flex items-center justify-between md:mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
              </div>
              <div className="space-y-1 text-right md:text-left">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
