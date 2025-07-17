## REST API Endpoints for Prisma E-Learning App

### 1. User Endpoints

```
GET    /api/users              → Get all users
GET    /api/users/:id          → Get user by ID
POST   /api/users              → Create a new user
  Body:
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword",
    "role": "STUDENT"
  }
PUT    /api/users/:id          → Update user by ID
DELETE /api/users/:id          → Delete user by ID
```

#### Auth-Related

```
POST   /api/auth/register
  Body:
  {
    "name": "Jane",
    "email": "jane@example.com",
    "password": "password123"
  }

POST   /api/auth/login
  Body:
  {
    "email": "jane@example.com",
    "password": "password123"
  }

GET    /api/auth/profile       → Get current user (protected)
```

---

### 2. Course Categories

```
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
  Body:
  {
    "name": "Web Development",
    "slug": "web-development"
  }
PUT    /api/categories/:id
DELETE /api/categories/:id
```

---

### 3. Courses

```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
  Body:
  {
    "title": "React Basics",
    "slug": "react-basics",
    "description": "Learn the basics of React",
    "thumbnail": "https://example.com/image.jpg",
    "categoryId": "uuid",
    "adminId": "uuid"
  }
PUT    /api/courses/:id
DELETE /api/courses/:id
```

---

### 4. Chapters & SubChapters

```
GET    /api/chapters/:courseId
POST   /api/chapters
  Body:
  {
    "title": "Introduction",
    "order": 1,
    "courseId": "uuid"
  }
PUT    /api/chapters/:id
DELETE /api/chapters/:id

GET    /api/subchapters/:chapterId
POST   /api/subchapters
  Body:
  {
    "title": "Getting Started",
    "videoUrl": "https://example.com/video.mp4",
    "videoLength": 120,
    "order": 1,
    "chapterId": "uuid"
  }
PUT    /api/subchapters/:id
DELETE /api/subchapters/:id
```

---

### 5. Resources

```
GET    /api/resources/:subChapterId
POST   /api/resources
  Body:
  {
    "title": "Lecture Slides",
    "fileUrl": "https://example.com/slide.pdf",
    "fileType": "pdf",
    "subChapterId": "uuid"
  }
DELETE /api/resources/:id
```

---

### 6. Enrollment

```
POST   /api/enrollments
  Body:
  {
    "userId": "uuid",
    "courseId": "uuid"
  }
GET    /api/enrollments/:userId
PUT    /api/enrollments/:id/complete
```

---

### 7. Quiz, Question & Option

```
GET    /api/quizzes/:courseId
POST   /api/quizzes
  Body:
  {
    "title": "Quiz 1",
    "courseId": "uuid"
  }

POST   /api/quizzes/:id/questions
  Body:
  {
    "text": "What is React?"
  }

POST   /api/questions/:id/options
  Body:
  {
    "text": "A JavaScript library",
    "isCorrect": true
  }
```

---

### 8. Progress Tracking

```
POST   /api/progress
  Body:
  {
    "userId": "uuid",
    "subChapterId": "uuid",
    "completed": true
  }
GET    /api/progress/:userId
```

---

### 9. Ratings

```
POST   /api/ratings
  Body:
  {
    "rating": 5,
    "comment": "Great course!",
    "userId": "uuid",
    "courseId": "uuid"
  }
GET    /api/ratings/:courseId
```

---

### 10. Testimonials

```
POST   /api/testimonials
  Body:
  {
    "message": "Loved the course!",
    "userId": "uuid",
    "courseId": "uuid"
  }

GET    /api/testimonials
GET    /api/testimonials/pending
PUT    /api/testimonials/:id/approve
```

---

### Middleware & Features to Add

- JWT Authentication Middleware
- Role-based Access Control (RBAC)
- Global Error Handling
- Input Validation with Zod/Joi/Express-Validator
