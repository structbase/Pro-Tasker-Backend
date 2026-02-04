require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db-connection");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Allowed CORS origins
 * - localhost for dev
 * - CLIENT_URL for production (Render)
 */
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
    Boolean,
); // removes undefined safely

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow server-to-server & tools like Postman
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials: true,
    }),
);

app.use("/api/users", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);

// Start server AFTER DB connection
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to DB", err);
        process.exit(1);
    });
