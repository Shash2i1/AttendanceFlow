import { create } from "zustand"
import api from "../utils/api"
import { toast } from "react-toastify"


const useAttandanceStore = create((set, get) => ({
    classLists: [],
    studentLists: [],
    totalStudents: 0,
    //get classes
    getClass: async () => {
        try {
            const res = await api.get("/main/fetch-class");
            if (res.status === 200) {
                set({ classLists: res.data.data });
            }

            return res.data.data;
        } catch (error) {
            console.log(error)
            return [];
        }
    },

    addClass: async (className) => {
        try {
            const res = await api.post("/main/add-class", { className });
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    },

    deleteClass: async (classId) => {
        try {
            const res = await api.post("/main/delete-class", { classId });
            if (res.status === 201) {
                toast.success("Class Deleted");
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    },

    //students feature
    addStudent: async (name, roll_no, classId) => {
        try {
            const res = await api.post("/main/add-student", { name, roll_no, classId });

            if (res.status === 201) {
                toast.success("Student Added Successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to add Students");
        }
    },

    fetchStudentLists: async (classId) => {
        try {
            const res = await api.post("/main/fetch-students", { classId });
            return res.data.data;
        } catch (error) {
            console.log(error);
            return []
        }
    },

    deleteStudent: async (studentId) => {
        try {
            const res = await api.post("/main/delete-student", { studentId });

            if (res.status === 201) {
                toast.success("Student deleted Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Students");
        }
    },

    setTotalStudents: (count) => {
        set({ totalStudents: count });
    },


    markAttendance: async (classId, date, records) => {
        try {
            const res = await api.post("/main/mark-attendance", { classId, date, records });
            toast.success('Attendance submitted successfully!');
        } catch (error) {
            console.log(error);
        }
    },

    fetchAttendanceStatus: async (classId, date) => {
        try {
            const res = await api.post("/main/fetch-attendance-status", { classId, date });
            return res.data.data; // list of students with status
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch attendance status");
            return [];
        }
    }


}))

export default useAttandanceStore;