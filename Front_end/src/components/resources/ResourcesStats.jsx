import { FileText, Download, Clock } from "lucide-react";
import { Card, CardContent } from "@mui/material";

const stats = [
  {
    label: "Total Resources",
    value: "248",
    icon: FileText,
    change: "+12 this month",
  },
  {
    label: "Total Downloads",
    value: "3,542",
    icon: Download,
    change: "+234 this week",
  },
  {
    label: "Video Hours",
    value: "156.5",
    icon: Clock,
    change: "+8.5 hours added",
  },
];

export default function ResourcesStats() {
  return (
    <div className="grid gap-4 mb-8 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            sx={{ padding: "0.6rem", borderRadius: "0.8rem" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center text-gray-700 justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
