import React, { useState } from "react";
import { Sun, Moon, Bell, User, Globe, Check } from "lucide-react";

function Settings() {
  const [name, setName] = useState("John Doe");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" }
  ];

  const handleSave = () => {
    console.log("Settings Saved:", { name, darkMode, notifications, language });
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className={`mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your experience
          </p>
        </div>

        {/* Settings Card */}
        <div className={`rounded-xl shadow-lg p-6 space-y-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          
          {/* Profile Section */}
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <User className="w-5 h-5" />
              Profile
            </h2>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Appearance Section */}
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Appearance
            </h2>
            
            <div className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Dark Mode
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Globe className="w-5 h-5" />
              Language
            </h2>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Preferred Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            
            <div className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Push Notifications
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Receive notifications about important updates
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              Save Settings
            </button>
          </div>

          {/* Success Message */}
          {showSaveSuccess && (
            <div className="flex items-center justify-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg text-green-800">
              <Check className="w-5 h-5" />
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;