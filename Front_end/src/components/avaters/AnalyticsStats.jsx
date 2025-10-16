import { Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Users, CheckCircle, Lock } from "lucide-react";
import api from "../../services/api";

let stats = [
  {
    title: "Total Avatars",
    value: 0,
    icon: Users,
    change: "+4 this month",
  },
  {
    title: "Active Avatars",
    value: 0,
    icon: CheckCircle,
    change: "Available to unlock",
  },
  {
    title: "Locked Avatars",
    value: 0,
    icon: Lock,
    change: "Require achievements",
  },
];

const changeStates = (bstates) => {
  stats = stats.map((st) => {
    console.log({ bstates });
    st.value = bstates[st.title] || 0;
    return st;
  });
};

export default function AvatarsStats() {
  const { data } = useQuery({
    queryKey: "avaterIfo",
    queryFn: () => api.get("api/avatar/info"),
    select: (response) => {
      changeStates(response.data?.data);
      return response.data?.data;
    },
    staleTime: () => "static",
  });

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
                  {data ? data[stat.title] : 0}
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
