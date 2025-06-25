import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    roll_no: {
        type: Number,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassModel",
        required: true
    }
},
{
    timestamps: true
})

export const Student = mongoose.model("student", studentSchema);