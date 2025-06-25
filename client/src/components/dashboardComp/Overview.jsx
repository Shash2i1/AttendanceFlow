import React, { useEffect, useState } from 'react';
import { Users, Calendar, Clock, TrendingUp, CheckCircle, AlertCircle, BookOpen, GraduationCap } from 'lucide-react';
import useAttandanceStore from '../../store/attendance.store';
import api from '../../utils/api';

const AttendanceOverview = ({ darkMode = false }) => {

  const { totalStudents, setTotalStudents, getClass } = useAttandanceStore();
  const [attendanceCount, setAttandanceCount] = useState({ present: 0, absent: 0 });

  const fetch = async () => {
    try {
      const fetchedClasses = await getClass();
      const total = fetchedClasses.reduce((acc, cls) => acc + (cls.studentCount || 0), 0);
      setTotalStudents(total); // updates Zustand

      const res = await api.get("/main/attendance-counts");
      setAttandanceCount({ present: res.data.presentCount, absent: res.data.absentCount });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch();

  }, [])

  const stats = [
    { icon: Users, label: 'Total Students', value: totalStudents, change: '+32', color: 'text-green-600 dark:text-green-400' },
    { icon: CheckCircle, label: 'Present Today', value: attendanceCount.present, change: '+18', color: 'text-green-600 dark:text-green-400' },
    { icon: AlertCircle, label: 'Absent Today', value: attendanceCount.absent, change: '-14', color: 'text-red-500 dark:text-red-400' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                Student Attendance Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">
                Welcome back! Here's your student attendance overview for today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-green-100 dark:border-gray-600 transition-all">
                <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm border border-green-100 dark:border-gray-600 transition-all">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 p-6 hover:shadow-md dark:hover:bg-gray-750 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400 mr-1" />
                    <span className={`text-sm font-medium ${stat.color} transition-colors`}>{stat.change}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1 transition-colors">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-gray-700 rounded-lg transition-all">
                  <stat.icon className="h-6 w-6 text-green-600 dark:text-green-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 p-6 transition-all">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-green-50 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-gray-650 rounded-lg border border-green-200 dark:border-gray-600 transition-all duration-300 group">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-all" />
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Mark Attendance</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Check-in students</p>
              </button>
              <button className="p-4 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-650 rounded-lg border border-blue-200 dark:border-gray-600 transition-all duration-300 group">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-all" />
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Class Reports</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Generate reports</p>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-650 rounded-lg border border-purple-200 dark:border-gray-600 transition-all duration-300 group">
                <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-all" />
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Class Schedule</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Manage timetable</p>
              </button>
              <button className="p-4 bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-650 rounded-lg border border-orange-200 dark:border-gray-600 transition-all duration-300 group">
                <GraduationCap className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3 group-hover:scale-110 transition-all" />
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Student Records</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Manage profiles</p>
              </button>
            </div>
          </div>
        </div>

        {/* Class-wise Attendance Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 p-6 transition-all">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Today's Class-wise Attendance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { class: 'Grade 8A', present: 28, total: 30 },
              { class: 'Grade 8B', present: 25, total: 28 },
              { class: 'Grade 9A', present: 32, total: 35 },
              { class: 'Grade 9B', present: 29, total: 32 },
              { class: 'Grade 10A', present: 27, total: 30 },
              { class: 'Grade 10B', present: 24, total: 28 }
            ].map((classData, index) => {
              const percentage = Math.round((classData.present / classData.total) * 100);
              const isHighAttendance = percentage >= 90;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-all duration-300">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors">{classData.class}</p>
                  <p className={`text-2xl font-bold mb-1 transition-colors ${isHighAttendance
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-900 dark:text-white'
                    }`}>
                    {percentage}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 transition-colors">
                    {classData.present}/{classData.total} students
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-all">
                    <div
                      className={`h-2 rounded-full transition-all ${isHighAttendance
                          ? 'bg-green-500 dark:bg-green-400'
                          : 'bg-yellow-500 dark:bg-yellow-400'
                        }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;