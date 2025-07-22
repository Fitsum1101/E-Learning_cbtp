const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ debug: true });

const userRoutes = require("./routes/users/user.routes");
const catagoryRoutes = require("./routes/categories/category.routes");
const courseRoutes = require("./routes/courses/course.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", catagoryRoutes);
app.use("/api", courseRoutes);

app.use((err, req, res, next) => {
  console.error("from express error handler", err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// {
//   asset_id: 'f6f724b9d0efe3db0e18bbdc93ddd59e',
//   public_id: 'course',
//   version: 1753185127,
//   version_id: '1196b89c5c17e471d4237c1d12b5359a',
//   signature: 'd4027b5feb29aac529d163c519beef22c1f47296',
//   width: 1880,
//   height: 1920,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2025-07-22T11:52:07Z',
//   tags: [],
//   bytes: 241171,
//   type: 'upload',
//   etag: 'df4db38335075693ae1a6b26459b9d88',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dofqz9ryj/image/upload/v1753185127/course.jpg',
//   secure_url: 'https://res.cloudinary.com/dofqz9ryj/image/upload/v1753185127/course.jpg',
//   asset_folder: '',
//   display_name: 'course',
//   original_filename: '1753001514944-830505620',
//   api_key: '557722267292516'
// }
