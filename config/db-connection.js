const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        /**
         * Connecting to DB using env variables
         */
        await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `Connected to MongoDB database: ${mongoose.connection.name}`,
        );
    } catch (error) {
        // Log error and stop the app if connection fails
        console.error("Connection error:", error.message);
        process.exit(1);
    }
};


module.exports = connectDB