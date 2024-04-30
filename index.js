const express = require("express");
const userRoutes = require("./Routes/userRoutes.js");

// create the express application
const app = express();

// middleware
app.use(express.json());

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
