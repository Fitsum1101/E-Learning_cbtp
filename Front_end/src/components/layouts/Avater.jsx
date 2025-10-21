import { Trophy, Award, Lock } from "lucide-react";

const avatars = [
  {
    id: 1,
    name: "Novice",
    emoji: "🎓",
    color: "bg-blue-100 dark:bg-blue-100",
    requirement: "free",
  },
  {
    id: 2,
    name: "Scholar",
    emoji: "📚",
    color: "bg-purple-100 dark:bg-purple-100",
    requirement: "course",
  },
  {
    id: 3,
    name: "Master",
    emoji: "⭐",
    color: "bg-yellow-100 dark:bg-yellow-100",
    requirement: "certificate",
  },
  {
    id: 4,
    name: "Legend",
    emoji: "👑",
    color: " bg-red-100",
    requirement: "both",
  },
];

const certificates = [
  {
    id: 1,
    title: "Web Development Certificate",
    issuer: "LearnQuest Academy",
    date: "Issued Jan 2024",
  },
  {
    id: 2,
    title: "React Mastery Certificate",
    issuer: "LearnQuest Academy",
    date: "Issued Feb 2024",
  },
  {
    id: 3,
    title: "UI/UX Design Certificate",
    issuer: "LearnQuest Academy",
    date: "Issued Mar 2024",
  },
  {
    id: 4,
    title: "Full-Stack Developer Certificate",
    issuer: "LearnQuest Academy",
    date: "Issued Apr 2024",
  },
];

const getUnlockText = (requirement) => {
  switch (requirement) {
    case "free":
      return "Free Avatar";
    case "course":
      return "Complete a Course";
    case "certificate":
      return "Earn a Certificate";
    case "both":
      return "Complete Course + Certificate";
    default:
      return "Unlock";
  }
};

export default function AvatarsCertificates() {
  return (
    <section className="px-4 py-20 bg-gray-50 back-ground-2 md:py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Avatars Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
              Unlock Avatars
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Progress through your learning journey and unlock exclusive
              avatars
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className="p-6 text-center transition-shadow bg-white border border-gray-200 rounded-2xl hover:shadow-lg"
              >
                <div
                  className={`${avatar.color} w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4`}
                >
                  {avatar.emoji}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {avatar.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {avatar.requirement !== "free" && (
                    <Lock size={14} className="text-muted-foreground" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {getUnlockText(avatar.requirement)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
              Earn Certificates
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Get recognized for your achievements with verified certificates
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start gap-4 p-6 transition-shadow bg-white rounded-2xl hover:shadow-lg"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                    <Trophy size={24} className="text-blue-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {cert.date}
                  </p>
                </div>
                <Award size={20} className="flex-shrink-0 text-blue-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
