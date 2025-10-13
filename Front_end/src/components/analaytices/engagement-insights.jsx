import { Card, CardContent, CardHeader } from "@mui/material";
import { TrendingUp, Clock, Target } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Peak Activity",
    value: "2-4 PM",
    description: "Highest user engagement during afternoon hours",
    color: "text-green-600",
  },
  {
    icon: Clock,
    title: "Avg. Session",
    value: "42 min",
    description: "Users spend quality time learning",
    color: "text-blue-600",
  },
  {
    icon: Target,
    title: "Completion",
    value: "85%",
    description: "Strong course completion rate this month",
    color: "text-purple-600",
  },
];

export default function EngagementInsights() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <h3>Engagement Insights</h3>
        <p>Key metrics and patterns</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.title} className="flex gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${insight.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {insight.title}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {insight.value}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
