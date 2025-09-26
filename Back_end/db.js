const db = require("./config/db");

// db.examTaker
//   .create({
//     data: {
//       userId: "94b57e76-04a9-49bd-9547-8dc14e17e337",
//       examId: "3642eead-d30b-4c88-a473-bb3a35a3f360",
//       attempt: 1,
//     },
//   })
//   .then((res) => console.log(res));

db.enrollment
  .updateMany({
    data: {
      completed: true,
    },
  })
  .then((res) => console.log(res));

// const courseCategories = [
//   {
//     name: "Web Development",
//     slug: "web-development",
//     categoryId: "f81fe61d-84e3-4e79-8847-6ac321d4b26d",
//     courses: [
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "HTML & CSS Fundamentals",
//         slug: "html-css-fundamentals",
//         description: "Learn the basics of HTML and CSS to build webpages.",
//         level: "Beginner",
//         thumbnail: "https://via.placeholder.com/300x200?text=HTML+CSS",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "JavaScript Basics",
//         slug: "javascript-basics",
//         description: "Introduction to JavaScript programming language.",
//         level: "Beginner",
//         thumbnail: "https://via.placeholder.com/300x200?text=JavaScript",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "Advanced JavaScript",
//         slug: "advanced-javascript",
//         description: "Deep dive into JavaScript for advanced concepts.",
//         level: "Advanced",
//         thumbnail: "https://via.placeholder.com/300x200?text=Advanced+JS",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "React for Beginners",
//         slug: "react-for-beginners",
//         description: "Learn React and build dynamic user interfaces.",
//         level: "Beginner",
//         thumbnail: "https://via.placeholder.com/300x200?text=React",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "Node.js Essentials",
//         slug: "nodejs-essentials",
//         description: "Learn Node.js to build backend applications.",
//         level: "Intermediate",
//         thumbnail: "https://via.placeholder.com/300x200?text=Node.js",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "Express.js Crash Course",
//         slug: "expressjs-crash-course",
//         description: "Build APIs with Express.js framework.",
//         level: "Intermediate",
//         thumbnail: "https://via.placeholder.com/300x200?text=Express.js",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "Full-Stack MERN Bootcamp",
//         slug: "fullstack-mern-bootcamp",
//         description:
//           "Learn MongoDB, Express, React, Node.js full-stack development.",
//         level: "Advanced",
//         thumbnail: "https://via.placeholder.com/300x200?text=MERN+Stack",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "Next.js Fundamentals",
//         slug: "nextjs-fundamentals",
//         description:
//           "Build server-side rendered React applications with Next.js.",
//         level: "Intermediate",
//         thumbnail: "https://via.placeholder.com/300x200?text=Next.js",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "TypeScript Mastery",
//         slug: "typescript-mastery",
//         description: "Master TypeScript for scalable JavaScript applications.",
//         level: "Advanced",
//         thumbnail: "https://via.placeholder.com/300x200?text=TypeScript",
//       },
//       {
//         adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//         title: "REST API Design",
//         slug: "rest-api-design",
//         description: "Learn best practices for designing RESTful APIs.",
//         level: "Intermediate",
//         thumbnail: "https://via.placeholder.com/300x200?text=REST+API",
//       },
//     ],
//   },
//   {
//     name: "Data Science",
//     slug: "data-science",
//     categoryId: "9032d8b0-913e-4a6d-aee9-060243606936",
//     courses: Array.from({ length: 10 }).map((_, i) => ({
//       adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//       title: `Data Science Course ${i + 1}`,
//       slug: `data-science-course-${i + 1}`,
//       description: `Description for Data Science Course ${i + 1}`,
//       level: ["Beginner", "Intermediate", "Advanced"][
//         Math.floor(Math.random() * 3)
//       ],
//       thumbnail: `https://via.placeholder.com/300x200?text=DS+${i + 1}`,
//     })),
//   },
//   {
//     name: "Mobile Development",
//     slug: "mobile-development",
//     categoryId: "dc653dbb-6c80-4452-85d3-f626e697fe82 ",
//     courses: Array.from({ length: 10 }).map((_, i) => ({
//       adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//       title: `Mobile Development Course ${i + 1}`,
//       slug: `mobile-course-${i + 1}`,
//       description: `Description for Mobile Development Course ${i + 1}`,
//       level: ["Beginner", "Intermediate", "Advanced"][
//         Math.floor(Math.random() * 3)
//       ],
//       thumbnail: `https://via.placeholder.com/300x200?text=Mobile+${i + 1}`,
//     })),
//   },
//   {
//     name: "Cybersecurity",
//     slug: "cybersecurity",
//     categoryId: "06fca483-692a-4dc8-910b-abf11cf82a40",

//     courses: Array.from({ length: 10 }).map((_, i) => ({
//       adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//       title: `Cybersecurity Course ${i + 1}`,
//       slug: `cyber-course-${i + 1}`,
//       description: `Description for Cybersecurity Course ${i + 1}`,
//       level: ["Beginner", "Intermediate", "Advanced"][
//         Math.floor(Math.random() * 3)
//       ],
//       thumbnail: `https://via.placeholder.com/300x200?text=Cyber+${i + 1}`,
//     })),
//   },
//   {
//     name: "Business & Management",
//     slug: "business-management",
//     categoryId: "d09eb4d6-ae5f-429b-a0d5-eecf46bc2bbb",
//     courses: Array.from({ length: 10 }).map((_, i) => ({
//       adminId: "f5d6e3af-ae61-4c71-ae62-eebd72d437fa",
//       title: `Business Course ${i + 1}`,
//       slug: `business-course-${i + 1}`,
//       description: `Description for Business & Management Course ${i + 1}`,
//       level: ["Beginner", "Intermediate", "Advanced"][
//         Math.floor(Math.random() * 3)
//       ],
//       thumbnail: `https://via.placeholder.com/300x200?text=Business+${i + 1}`,
//     })),
//   },
// ];

// // Promise.all(
// //   courseCategories.map(async (cat) => {
// //     const course = await db.courseCategory.create({
// //       data: {
// //         name: cat.name,
// //         slug: cat.slug,
// //       },
// //     });

// //     return course;
// //   })
// // )
// //   .then((result) => console.log(result))
// //   .catch((err) => console.error(err));

// db.user
//   .create({
//     data: {
//       email: "test@example.com",
//       firstName: "Test",
//       lastName: "User",
//       userName: "testuser",
//       password: "password",
//       role: "ADMIN",
//     },
//   })
//   .then((result) => {
//     return Promise.all(
//       courseCategories.map(async (cat) => {
//         const courses = cat.courses;
//         const categoryId = cat.categoryId;
//         const course = await db.course.createMany({
//           data: courses.map((course) => ({
//             adminId: result.id,
//             title: course.title,
//             slug: course.slug,
//             description: course.description,
//             published: true,
//             categoryId: categoryId,
//             level: course.level,
//             thumbnail: course.thumbnail,
//           })),
//         });

//         return course;
//       })
//     );
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// // Promise.all(
// //   courseCategories.map(async (cat) => {
// //     const courses = cat.courses;
// //     const categoryId = cat.categoryId;
// //     const adminId = cat.courses[0].adminId;
// //     const course = await db.course.createMany({
// //       data: courses.map((course) => ({
// //         adminId: adminId,
// //         title: course.title,
// //         slug: course.slug,
// //         description: course.description,
// //         published: true,
// //         categoryId: categoryId,
// //         level: course.level,
// //         thumbnail: course.thumbnail,
// //       })),
// //     });
// //     console.log(course);
// //     return course;
// //   })
// // )
// //   .then((result) => console.log(result))
// //   .catch((err) => console.error(err));

// const jsBasicsQuestions = [
//   {
//     question: "What is the output of console.log(typeof null) in JavaScript?",
//     id: "b5482772-8b3c-4cbf-8eb5-c40348d250cb",
//     options: [
//       { text: "object", isCorrect: true },
//       { text: "null", isCorrect: false },
//       { text: "undefined", isCorrect: false },
//       { text: "number", isCorrect: false },
//     ],
//   },
//   {
//     question: "Which of the following is NOT a JavaScript data type?",
//     id: "1ec4863a-d5ba-4040-ae2d-e03ca9f0d9bb",
//     options: [
//       { text: "String", isCorrect: false },
//       { text: "Number", isCorrect: false },
//       { text: "Boolean", isCorrect: false },
//       { text: "Character", isCorrect: true },
//     ],
//   },
//   {
//     question:
//       "What keyword is used to declare a variable that cannot be reassigned?",
//     id: "f5949f02-d68c-41b3-8882-ba79e2127c8f",
//     options: [
//       { text: "let", isCorrect: false },
//       { text: "var", isCorrect: false },
//       { text: "const", isCorrect: true },
//       { text: "static", isCorrect: false },
//     ],
//   },
//   {
//     question: "What is the result of '5' + 3 in JavaScript?",
//     id: "d116e111-79e3-4d8a-8c61-1d80341ee89e",
//     options: [
//       { text: "8", isCorrect: false },
//       { text: "53", isCorrect: true },
//       { text: "NaN", isCorrect: false },
//       { text: "Error", isCorrect: false },
//     ],
//   },
//   {
//     question: "Which symbol is used for single-line comments in JavaScript?",
//     id: "c39b27f1-bb14-4cd0-b893-3756f1131d6f",
//     options: [
//       { text: "<!--", isCorrect: false },
//       { text: "#", isCorrect: false },
//       { text: "//", isCorrect: true },
//       { text: "/* */", isCorrect: false },
//     ],
//   },
// ];

// db.question
//   .findMany({
//     where: {
//       question: {
//         contains: "java ",
//       },
//     },
//   })
//   .then((result) =>
//     Promise.all(
//       jsBasicsQuestions.map(async (que, i) => {
//         const option = await db.option.createMany({
//           data: que.options.map((opt) => ({
//             ...opt,
//             questionId: que.id,
//           })),
//         });
//       })
//     )
//   )
//   .catch((err) => console.error(err));
