import { useState } from "react";
import { BookOpen, Award, Zap, Users, Target, Lightbulb } from "lucide-react";
import Button from "../../components/common/Button/Button";

export default function AboutPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description:
        "Learn from industry experts with structured, hands-on courses covering everything from web development to data science.",
    },
    {
      icon: Award,
      title: "Earn Certificates",
      description:
        "Complete courses and earn recognized certificates to showcase your skills and achievements to employers.",
    },
    {
      icon: Zap,
      title: "Unlock Avatars",
      description:
        "Customize your learning journey with unique avatars. Unlock new avatars by completing courses and earning certificates.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Join a vibrant community of learners, share knowledge, and grow together with peers from around the world.",
    },
    {
      icon: Target,
      title: "Personalized Paths",
      description:
        "Get recommendations tailored to your goals and learning style for a more effective educational experience.",
    },
    {
      icon: Lightbulb,
      title: "Expert Instructors",
      description:
        "Learn from experienced professionals who are passionate about sharing their expertise and helping you succeed.",
    },
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                About <span className="text-blue-700">LearnQuest</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Empowering learners worldwide to achieve their goals through
                quality education, recognition, and community.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Illustration */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md h-80 about-section  rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-12 h-12 text-blue-700" />
                      </div>
                      <p className="text-sm font-semibold text-blue-700">
                        Our Mission
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Mission Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  At LearnQuest, we believe that quality education should be
                  accessible to everyone, everywhere. Our mission is to
                  democratize learning by providing world-class courses,
                  meaningful recognition, and a supportive community.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We're committed to helping learners not just acquire
                  knowledge, but also gain confidence, credentials, and
                  connections that propel them forward in their careers and
                  personal growth.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-blue-700">50K+</div>
                    <p className="text-sm text-muted-foreground">
                      Active Learners
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-blue-700">200+</div>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-blue-700">15K+</div>
                    <p className="text-sm text-muted-foreground">
                      Certificates Earned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose LearnQuest?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a unique learning experience designed to help you
                succeed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-8 rounded-xl  border  bg-gray-100  border-gray-200  hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in course quality and
                  instructor expertise.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive environment where learners help each
                  other grow.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve to meet the changing needs of modern
                  learners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their
              careers and lives with LearnQuest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="border border-blue-500 bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Explore Courses
              </Button>
              <Button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
