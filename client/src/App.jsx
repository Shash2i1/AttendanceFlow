import { Routes, Route, Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";
import useAuthstore from "./store/auth.store";

import HomeLayout from "./Layouts/HomeLayout";
import Dashboard from "./Layouts/Dashboard";
import Home from "./components/Home";
import Login from "./components/authComp/Login";
import AuthLayout from "./Layouts/AuthLayout";
import SignUp from "./components/authComp/SignUp";
import Overview from "./components/dashboardComp/Overview";
import ClassInfo from "./components/dashboardComp/ClassInfo";
import Settings from "./components/dashboardComp/Settings"
import ClassDetails from "./components/classComponents/ClassDetails";
import MarkAttendance from "./components/attendanceComp/MarkAttendance";


function App() {
  const { isLoading, authStatus, getUser } = useAuthstore();

  // Get user once on app load
  useEffect(() => {
    getUser(); 
  }, []);

  return (
    
    <>
      <Routes>
        {/* Home layout */}
        <Route path="/" element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
        </Route>

        {/* Auth layout - Redirect to /dashboard if already logged in */}
        <Route
          path="/auth"
          element={!authStatus ? <AuthLayout /> : <Navigate to="/dashboard" />}
        >
          <Route
            path="login"
            element={!authStatus ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="signup"
            element={!authStatus ? <SignUp /> : <Navigate to="/dashboard" />}
          />
        </Route>

        {/* Dashboard - Redirect to login if not authenticated */}
        <Route
          path="/dashboard"
          element={authStatus ? <Dashboard /> : <Navigate to="/auth/login" />}
        >
          <Route path="" element={<Overview/>}/>
          <Route path="class-info" element={<ClassInfo/>}/>
          <Route path="class-info/:id/:name" element={<ClassDetails />} />
          <Route path="class-info/:id/:name/attendance" element={<MarkAttendance/>}/>
          <Route path="settings" element={ <Settings/>}/>
        </Route>
  
      </Routes>

      {/* Loader */}
      {isLoading && (
        <div style={overlayStyle}>
          <BeatLoader color="#36d7b7" size={20} />
        </div>
      )}
    </>
  );
}

export default App;

// Loader style
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(1px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};
