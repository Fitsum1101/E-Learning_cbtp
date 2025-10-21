import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-4 py-16 text-white bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 mb-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-foreground">
                <span className="font-bold text-foreground">LQ</span>
              </div>
              <span className="text-lg font-bold">LearnQuest</span>
            </div>
            <p className="text-sm opacity-75">
              Empowering learners worldwide with quality education and
              recognition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Courses
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-bold">Resources</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Support
                </Link>
              </li>
              <li>
                <Link to={"/"} className="transition-opacity hover:opacity-100">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-bold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="transition-opacity hover:opacity-75">
                <Twitter size={20} />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <Linkedin size={20} />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <Github size={20} />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-gray-600">
          <div className="flex flex-col items-center justify-between text-sm opacity-75 md:flex-row">
            <p>&copy; 2025 LearnQuest. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="transition-opacity hover:opacity-100">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-opacity hover:opacity-100">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
