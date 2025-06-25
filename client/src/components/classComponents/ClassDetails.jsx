import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Users, Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import useAttandanceStore from "../../store/attendance.store";
import { useParams, useNavigate } from "react-router-dom";

function ClassDetails() {
    const { id, name } = useParams();
    const navigate = useNavigate();


    const [rollNo, setRollNo] = useState("");
    const [studentName, setStudentName] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStudentDeleteModal, setShowStudentDeleteModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [studentLists, setStudentsLists] = useState([]);

    const { deleteClass, addStudent, fetchStudentLists, deleteStudent } = useAttandanceStore();

    const handleNavigate = () =>{
        navigate(-1);
    }

    const handleAddStudent = async () => {
        if (!/^\d+$/.test(rollNo) || !studentName.trim()) return;
        await addStudent(studentName, rollNo, id);
        fetch();
        setRollNo("");
        setStudentName("");
    };


    const handleDeleteClass = async () => {
        await deleteClass(id);
        setShowDeleteModal(false);
        navigate("/dashboard/class-info");
    };

    const handleDeleteStudent = async () => {
        if (!selectedStudentId) return;
        await deleteStudent(selectedStudentId);
        setShowStudentDeleteModal(false);
        fetch(); // Refresh list after deletion
    };


    const fetch = async () => {
        const result = await fetchStudentLists(id);
        setStudentsLists(result);
    };

    useEffect(() => {
        fetch();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="max-w-6xl mx-auto space-y-4">

                {/* Route Tracker / Breadcrumb Navigation */}
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 dark:border-green-800 p-4">
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>

                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <button
                                onClick={() => navigate('/dashboard/class-info')}
                                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium transition-colors duration-200"
                            >
                                Classes
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-500 dark:text-gray-400">
                                {name}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Header Section - Compact */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

                        {/* Left side - Class info */}
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                    {name}
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</p>
                            </div>
                        </div>

                        {/* Right side - Action buttons */}
                        <div className="flex gap-2">
                            <Link to={`attendance`} title="mark todays attendance" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-lg hover:shadow-xl">
                                Mark Attendance
                            </Link>
                            <button
                                title="delete the class"
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1 text-sm shadow-lg hover:shadow-xl"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add Student Form - Compact */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-lg">
                            <Plus className="w-4 h-4 text-green-600" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Add New Student</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Roll No"
                            value={rollNo}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^\d+$/.test(value)) {
                                    setRollNo(value);
                                }
                            }}
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="Student Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                            onClick={handleAddStudent}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                            Add Student
                        </button>
                    </div>
                </div>

                {/* Students Table - Main Focus */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-600 p-1.5 rounded-lg">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-green-800 dark:text-green-200">
                                    Student List
                                </h2>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    {studentLists.length} student{studentLists.length !== 1 ? 's' : ''} enrolled
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Roll No
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Student Name
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {studentLists.length > 0 ? (
                                    studentLists.map((student, index) => (
                                        <tr key={student._id} className="hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {student.roll_no}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedStudentId(student._id);
                                                        setShowStudentDeleteModal(true);
                                                    }}
                                                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3 mr-1" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                                                    <Users className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        No students added yet
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                        Add your first student using the form above
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Delete Class Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Delete Class
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Are you sure you want to delete this class? This action cannot be undone and will remove all associated data.
                            </p>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteClass}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-medium"
                                >
                                    Delete Class
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Student Confirmation Modal */}
                {showStudentDeleteModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Remove Student
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Are you sure you want to remove this student from the class? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setShowStudentDeleteModal(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteStudent}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-medium"
                                >
                                    Remove Student
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassDetails;