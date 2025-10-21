import { ArrowRight, Star } from "lucide-react";
import Button from "../common/Button/Button";

export default function HeroSection() {
  return (
    <section className="relative px-4 py-20 back-ground md:py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-foreground">
                Learn. Earn Certificates. Unlock Avatars.
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Master new skills with our comprehensive courses. Earn
                recognized certificates and unlock exclusive avatars as you
                progress through your learning journey.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button className="flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-900">
                Start Learning <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-base font-semibold bg-transparent border border-gray-300 rounded-lg"
              >
                Explore Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-2xl font-bold text-blue-700 md:text-3xl">
                  500+
                </p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700 md:text-3xl">
                  50K+
                </p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700 md:text-3xl">
                  95%
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Visual - Featured Course Card */}
          <div className="items-center justify-center hidden md:flex">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 border-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl"></div>
              <div className="relative overflow-hidden transition-shadow border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10">
                  <img
                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                    alt="Web Development Masterclass"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute px-3 py-1 text-xs font-semibold rounded-full top-3 right-3 bg-primary text-primary-foreground">
                    FREE
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 space-y-4">
                  {/* Instructor */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      <span className="text-xs font-bold text-primary">JD</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      John Developer
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-foreground line-clamp-2">
                    Web Development Masterclass
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      4.8
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (2,450)
                    </span>
                  </div>

                  {/* Student Count */}
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      12,500+
                    </span>{" "}
                    students enrolled
                  </p>

                  {/* Enroll Button */}
                  <Button className="w-full py-2 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
