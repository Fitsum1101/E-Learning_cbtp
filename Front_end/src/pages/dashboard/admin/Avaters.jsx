// import { AdminSidebar } from "@/components/admin-sidebar";
// import { AvatarGenerator } from "@/components/avatar-generator";

import AnalyticsAvaterStats from "../../../components/avaters/AnalyticsStats";
import AvatarGenerator from "../../../components/avaters/AvatarGenerator";
import AvatarsList from "../../../components/avaters/AvatarsList";

export default function AvatarsPage() {
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
          <AvatarsList />
        </div>
      </div>
    </>
  );
}
