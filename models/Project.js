const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true, // fixed typo from 'retuired'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        workplace: {
            type: Schema.Types.ObjectId,
            ref: "Workplace",
            default: null, // optional for now
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model("Project", projectSchema);
