const express = require("express");
const bodyParser = require("body-parser");

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
