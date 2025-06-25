import {Router} from "express";
import validateToken from "../middleware/validateToken.js"
import { addStudent, createClass, deleteClass, deleteStudent, fetchAttendanceStatus, fetchClasses, fetchStudentsList, getAttendanceCounts, markAttendance } from "../controller/attendance.controller.js";

const route = Router();

//route to create class
route.post("/add-class", validateToken, createClass);
route.get("/fetch-class", validateToken, fetchClasses);
route.post("/delete-class", validateToken, deleteClass);

//routes related to students
route.post("/add-student", validateToken, addStudent);
route.post("/fetch-students", validateToken, fetchStudentsList);
route.post("/delete-student", validateToken, deleteStudent);

//attendance
route.post("/fetch-attendance-status", validateToken, fetchAttendanceStatus);
route.post("/mark-attendance", validateToken, markAttendance);
route.get('/attendance-counts', validateToken, getAttendanceCounts);



export default route;