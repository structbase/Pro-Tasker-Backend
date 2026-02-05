require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db-connection");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

app.use("/api/users", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes); 

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
