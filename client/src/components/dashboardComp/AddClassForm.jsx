import React, { useState, useEffect } from "react";
import { X, BookOpen, Plus, Sparkles, Users, Calendar } from "lucide-react";
import useAttendanceStore from "../../store/attendance.store";

function AddClassForm({ onClose }) {
  const [className, setClassName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { addClass, getClass } = useAttendanceStore(); // optional: refresh list after add

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (className.trim() === "") return;

    setIsLoading(true);
    try {
      await addClass(className);
      await getClass(); // optional: if list doesn't auto-update
      setIsVisible(false);
      setTimeout(() => {
        setClassName("");
        setIsLoading(false);
        onClose();
      }, 200); // after animation
    } catch (err) {
      console.error("Failed to create class", err);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden transition-all duration-300 transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Add New Class</h2>
                <p className="text-blue-100 text-sm">Create a new class to manage</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Class Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Mathematics 101"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                  autoFocus
                  disabled={isLoading}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Preview */}
            {className.trim() && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 transform transition-all duration-300">
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Preview
                </p>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <h3 className="font-semibold text-gray-800">{className}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> 0 students
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Just created
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || className.trim() === ""}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Class
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Optional Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 font-medium">Creating your class...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddClassForm;
