import Attendance from "../model/attendance.model.js";
import { ClassModel } from "../model/class.model.js";
import { Student } from "../model/student.model.js";
import mongoose from "mongoose";

const createClass = async (req, res) => {
    const { className } = req.body;
    const owner = req.user._id;

    if (!className) {
        return res.status(404).json({ error: "All fields are required" });
    }

    try {

        const newClass = new ClassModel({ className, owner });
        await newClass.save();

        return res.status(201).json({ message: "new class created", data: newClass });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

//method to get all classes

const fetchClasses = async (req, res) => {
    const owner = req.user._id; // 

    try {
        const listOfClass = await ClassModel.find({ owner });
        if (!listOfClass.length) {
            return res.status(404).json({ message: "No class found" });
        }

        return res.status(200).json({
            message: "Classes fetched successfully",
            data: listOfClass,
        });
    } catch (error) {
        console.error("Fetch classes error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//delete class
const deleteClass = async (req, res) => {
    const { classId } = req.body;

    try {
        // Check if class exists
        const isClassExist = await ClassModel.findById(classId);
        if (!isClassExist) return res.status(404).json({ message: "No class exists" });

        // Delete all students belonging to this class
        await Student.deleteMany({ classId: new mongoose.Types.ObjectId(classId) });

        // Delete the class itself
        await ClassModel.findByIdAndDelete(classId);

        return res.status(201).json({ message: "Class and its students deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server Error" });
    }
};

//method to add student
const addStudent = async (req, res) => {
    const { name, roll_no, classId } = req.body;

    try {
        if (!name || !roll_no || !classId)
            return res.status(405).json({ message: "All fields are required" });

        const newStudent = new Student({ name, roll_no, classId });
        await newStudent.save();

        // 🔁 Increment studentCount
        await ClassModel.findByIdAndUpdate(classId, { $inc: { studentCount: 1 } });

        return res.status(201).json({ message: "Student added successfully", data: newStudent });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//fetch student details
const fetchStudentsList = async (req, res) => {
    const { classId } = req.body;

    try {
        const studentsList = await Student.find({ classId }).sort({ roll_no: 1 });

        if (!studentsList.length > 0) return res.status(404).json({ message: "No students are there" });

        return res.status(201).json({ message: "Students list fetched successfully", data: studentsList });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


//delete student
const deleteStudent = async (req, res) => {
    const { studentId } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Save classId before deletion
        const classId = student.classId;

        await Student.findByIdAndDelete(studentId);

        // Decrement studentCount
        await ClassModel.findByIdAndUpdate(classId, { $inc: { studentCount: -1 } });

        return res.status(201).json({ message: "Student deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const markAttendance = async (req, res) => {
    try {
        const { classId, date, records } = req.body;

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({ classId, date: normalizedDate });

        if (attendance) {
            const recordMap = new Map();
            records.forEach(r => recordMap.set(r.studentId.toString(), r.status));

            attendance.records = attendance.records.map(record => {
                const newStatus = recordMap.get(record.studentId.toString());
                if (newStatus) {
                    return { ...record.toObject(), status: newStatus };
                }
                return record;
            });

            // Add any new student entries not present before
            records.forEach(r => {
                const exists = attendance.records.findIndex(existing => existing.studentId.toString() === r.studentId);
                if (exists === -1) {
                    attendance.records.push(r);
                }
            });

            await attendance.save();
            return res.status(200).json({ message: "Attendance updated", attendance });
        }

        // Create new attendance if not found
        attendance = new Attendance({
            classId,
            date: normalizedDate,
            records
        });

        await attendance.save();
        res.status(201).json({ message: "Attendance created", attendance });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const fetchAttendanceStatus = async (req, res) => {
    try {
        const { classId, date } = req.body;

        if (!classId || !date) {
            return res.status(400).json({ message: "classId and date are required" });
        }

        const students = await Student.find({ classId }).sort({ roll_no: 1 });
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({ classId, date: normalizedDate });

        const statusMap = new Map();
        if (attendance) {
            attendance.records.forEach(record => {
                statusMap.set(record.studentId.toString(), record.status);
            });
        }

        const studentsWithStatus = students.map(student => ({
            _id: student._id,
            name: student.name,
            roll_no: student.roll_no,
            status: statusMap.get(student._id.toString()) || "Absent"
        }));

        return res.status(200).json({
            message: "Attendance fetched",
            data: studentsWithStatus
        });

    } catch (error) {
        console.error("fetchAttendanceStatus error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAttendanceCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get all classIds owned by the logged-in user
    const classes = await ClassModel.find({ owner: userId }, '_id');
    const classIds = classes.map(cls => cls._id);

    if (classIds.length === 0) {
      return res.status(200).json({ presentCount: 0, absentCount: 0 });
    }

    // 2. Fetch only attendance from those classIds
    const attendanceRecords = await Attendance.find(
      { classId: { $in: classIds } },
      'records'
    );

    let presentCount = 0;
    let absentCount = 0;

    attendanceRecords.forEach(attendance => {
      attendance.records.forEach(record => {
        if (record.status === 'Present') presentCount++;
        else if (record.status === 'Absent') absentCount++;
      });
    });

    return res.status(200).json({
      presentCount,
      absentCount,
    });

  } catch (error) {
    console.error('getAttendanceCounts error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};




export {
    createClass,
    fetchClasses,
    deleteClass,
    addStudent,
    fetchStudentsList,
    deleteStudent,
    markAttendance,
    fetchAttendanceStatus,
    getAttendanceCounts
}