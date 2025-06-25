import { useEffect, useState } from "react";
import { Plus, BookOpen, Users, Calendar, ArrowRight, Sparkles } from "lucide-react";
import AddClassForm from "./AddClassForm";
import useAttandanceStore from "../../store/attendance.store";
import useAuthstore from "../../store/auth.store";
import {Link} from "react-router-dom"

function ClassInfo() {
  const { classLists, getClass, setTotalStudents , totalStudents} = useAttandanceStore();
  const {setIsLoading} = useAuthstore();
  const [isFormVisible, setIsFormVisible] = useState(false);

/*const fetch = async () => {
  setIsLoading(true);
  const fetchedClasses = await getClass();
  
  const total = fetchedClasses.reduce((acc, cls) => acc + (cls.studentCount || 0), 0);
  setTotalStudents(total); // updates Zustand
  setIsLoading(false);
};

  useEffect(() => {
    
    fetch();
  
  }, [])*/


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
              All Classes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your classes and track attendance</p>
          </div>
          <button
            onClick={() => setIsFormVisible(true)}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            Add New Class
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{classLists.length}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Classes</p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {classLists.reduce((acc, cls) => acc + (cls.studentCount || 0), 0)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Students</p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{classLists.length}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Classes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        {classLists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classLists.map((cls, index) => (
              <div
                key={cls._id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 dark:border-gray-700/30 transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Class Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
                  </div>
                </div>

                {/* Class Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {cls.className}
                </h3>

                {/* Class Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span title="Number of students">{cls.studentCount || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Next: {cls.nextClass || 'Not scheduled'}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                to={`${cls._id}/${encodeURIComponent(cls.className)}`}
                title="click to visit the class" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group">
                  <span>View Class</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No Classes Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first class</p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Your First Class
            </button>
          </div>
        )}

        {/* Add Class Form Modal */}
        {isFormVisible && (
          <AddClassForm onClose={() => setIsFormVisible(false)} />
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .slide-in-from-bottom {
          animation: slideInFromBottom 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ClassInfo;