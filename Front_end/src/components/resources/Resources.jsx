import ResourceCard from "./ReourcesCard";

const resources = [
  {
    id: "1",
    name: "Introduction to React Hooks",
    type: "video",
    course: "Web Development",
    lesson: "Module 4: React Introduction",
    uploadDate: "2025-01-15",
    size: "245 MB",
    duration: "45:30",
    downloads: 156,
  },
  {
    id: "2",
    name: "CSS Grid Layout Guide",
    type: "pdf",
    course: "Web Development",
    lesson: "Module 2: CSS Fundamentals",
    uploadDate: "2025-01-14",
    size: "2.4 MB",
    downloads: 89,
  },
  {
    id: "3",
    name: "Design Principles Presentation",
    type: "slides",
    course: "Design",
    lesson: "Lesson 1: Design Principles",
    uploadDate: "2025-01-13",
    size: "8.7 MB",
    downloads: 124,
  },
  {
    id: "4",
    name: "JavaScript ES6 Features",
    type: "video",
    course: "Web Development",
    lesson: "Module 3: JavaScript Basics",
    uploadDate: "2025-01-12",
    size: "189 MB",
    duration: "38:15",
    downloads: 203,
  },
  {
    id: "5",
    name: "UI/UX Best Practices",
    type: "pdf",
    course: "Design",
    // No lesson - general course resource
    uploadDate: "2025-01-11",
    size: "3.2 MB",
    downloads: 167,
  },
  {
    id: "6",
    name: "Advanced TypeScript",
    type: "document",
    course: "Web Development",
    lesson: "Module 5: Advanced React Patterns",
    uploadDate: "2025-01-10",
    size: "1.8 MB",
    downloads: 95,
  },
];

export default function ResourcesList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
