import mongoose from "mongoose"

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    studentCount: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true
    });


export const ClassModel = mongoose.model("classmodel", classSchema);