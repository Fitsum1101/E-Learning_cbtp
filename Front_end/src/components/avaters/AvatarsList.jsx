import AvatarCard from "./AvatarCard";

export default function AvatarsList({ avaters = [] }) {
  console.log({ avaters });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">All Avatars</h2>
        <p className="text-sm text-muted-foreground">
          {avaters?.length} avatars
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {avaters.map((avatar) => (
          <AvatarCard key={avatar.id} avatar={avatar} />
        ))}
      </div>
    </div>
  );
}
