import AvatarCard from "./AvatarCard";

const mockAvatars = [
  {
    id: "1",
    name: "Golden Champion",
    style: "avataaars",
    seed: "champion123",
    unlockRule: "Complete 10 courses",
    status: "active",
    previewUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=champion123",
  },
  {
    id: "2",
    name: "Silver Scholar",
    style: "lorelei",
    seed: "scholar456",
    unlockRule: "Complete 5 courses",
    status: "active",
    previewUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=scholar456",
  },
  {
    id: "3",
    name: "Bronze Beginner",
    style: "bottts",
    seed: "beginner789",
    unlockRule: "Complete first course",
    status: "active",
    previewUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=beginner789",
  },
  {
    id: "4",
    name: "Platinum Master",
    style: "personas",
    seed: "master999",
    unlockRule: "Complete 50 courses",
    status: "locked",
    previewUrl: "https://api.dicebear.com/7.x/personas/svg?seed=master999",
  },
  {
    id: "5",
    name: "Diamond Elite",
    style: "pixel-art",
    seed: "elite888",
    unlockRule: "Complete 100 courses",
    status: "locked",
    previewUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=elite888",
  },
  {
    id: "6",
    name: "Emerald Expert",
    style: "adventurer",
    seed: "expert777",
    unlockRule: "Complete 25 courses",
    status: "active",
    previewUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=expert777",
  },
];

export default function AvatarsList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">All Avatars</h2>
        <p className="text-sm text-muted-foreground">
          {mockAvatars.length} avatars
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAvatars.map((avatar) => (
          <AvatarCard key={avatar.id} avatar={avatar} />
        ))}
      </div>
    </div>
  );
}
