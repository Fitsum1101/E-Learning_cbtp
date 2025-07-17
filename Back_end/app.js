const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
