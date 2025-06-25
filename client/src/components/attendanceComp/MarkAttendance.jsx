import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAttandanceStore from '../../store/attendance.store';
import { toast } from 'react-toastify';

function MarkAttendance() {
  const { id: classId, name } = useParams();
  const navigate = useNavigate();
  const {
    fetchAttendanceStatus,
    markAttendance,
  } = useAttandanceStore();

  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  });

  // Fetch students + their attendance for the date
  useEffect(() => {
    const load = async () => {
      if (!classId || !date) return;

      try {
        const res = await fetchAttendanceStatus(classId, date);
        setStudents(res);

        // map initial status
        const statusObj = {};
        res.forEach((student) => {
          statusObj[student._id] = student.status || 'Absent';
        });
        setAttendanceStatus(statusObj);
      } catch (err) {
        toast.error('Failed to load attendance');
        console.error(err);
      }
    };

    load();
  }, [classId, date]);

  // Toggle Present/Absent
  const toggleStatus = (studentId) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    const records = Object.keys(attendanceStatus).map((studentId) => ({
      studentId,
      status: attendanceStatus[studentId],
    }));

    try {
      await markAttendance(classId, date, records);
    } catch (err) {
      toast.error('Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Route Tracker / Breadcrumb Navigation */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 dark:border-green-800 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden xs:inline">Back</span>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                Dashboard
              </button>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <button
                onClick={() => navigate('/classes')}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                Classes
              </button>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate max-w-20 sm:max-w-none">
                {name}
              </span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Mark Attendance
              </span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 dark:border-green-800 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
                    Mark Attendance
                  </h1>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-1">
                    <span className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Class:</span>
                    <span className="px-2 xs:px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-sm w-fit">
                      {name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {students.length} students enrolled
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Date Selector */}
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-green-700 rounded-xl focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 transition-all duration-200 text-gray-700 dark:text-gray-200 shadow-sm text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="hidden xs:inline">Submit Attendance</span>
                  <span className="xs:hidden">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table/Cards */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 dark:border-green-800 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="hidden xs:inline">Student Attendance</span>
              <span className="xs:hidden">Attendance</span>
            </h2>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-green-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Roll No
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Student Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Attendance Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100 dark:divide-green-800">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-green-25 dark:bg-gray-800/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-green-700 dark:text-green-300">
                              {student.roll_no}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            #{student.roll_no}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {student.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleStatus(student._id)}
                          className={`relative px-6 py-2 rounded-full font-semibold text-white text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                            attendanceStatus[student._id] === 'Present'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                              : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {attendanceStatus[student._id] === 'Present' ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            {attendanceStatus[student._id]}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No students found</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">No students are enrolled in this class yet.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden">
            {students.length > 0 ? (
              <div className="p-4 space-y-4">
                {students.map((student, index) => (
                  <div
                    key={student._id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-green-100 dark:border-green-800 p-4 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-green-700 dark:text-green-300">
                            {student.roll_no}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Roll No: #{student.roll_no}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStatus(student._id)}
                        className={`px-4 py-2 rounded-full font-semibold text-white text-xs transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0 ${
                          attendanceStatus[student._id] === 'Present'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                            : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          {attendanceStatus[student._id] === 'Present' ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className="hidden xs:inline">{attendanceStatus[student._id]}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No students found</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No students are enrolled in this class yet.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Footer */}
        {students.length > 0 && (
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{students.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Present</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    {Object.values(attendanceStatus).filter(status => status === 'Present').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Absent</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600">
                    {Object.values(attendanceStatus).filter(status => status === 'Absent').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkAttendance;