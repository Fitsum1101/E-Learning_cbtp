import { useQuery } from "@tanstack/react-query";

import AnalyticsAvaterStats from "../../../components/avaters/AnalyticsStats";
import AvatarGenerator from "../../../components/avaters/AvatarGenerator";
import AvatarsList from "../../../components/avaters/AvatarsList";
import api from "../../../services/api";

export default function AvatarsPage() {
  const { data: avaters } = useQuery({
    queryKey: ["getAvaters"],
    queryFn: () => api.get("api/avatar"),
    select: (response) => response.data?.data,
  });

  return (
    <>
      <div className="min-h-screen bg-background ">
        <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Avatar Management
            </h1>
            <p className="mt-2 text-muted-foreground">
              Generate and manage avatars for your platform
            </p>
          </div>

          <AvatarGenerator />
          <AnalyticsAvaterStats />
          <AvatarsList avaters={avaters} />
        </div>
      </div>
    </>
  );
}
