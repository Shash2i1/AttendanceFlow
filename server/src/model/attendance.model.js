// models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
      },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
