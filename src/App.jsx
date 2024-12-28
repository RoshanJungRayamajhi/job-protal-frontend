import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import Logout from "./Components/auth/Logout";
import Job from "./Pages/Job";
import Browse from "./Pages/Browse";
import Profile from "./Pages/profile";
import JobDetail from "./Pages/JobDetail";
import Companies from "./Pages/Companies";
import CompanyCreate from "./Pages/CompanyCreate";
import CompanyDetail from "./Pages/CompanySetup";
import CompanySetup from "./Pages/CompanySetup";
import AdminJob from "./Pages/AdminJob";
import AdminJobCreate from "./Pages/AdminJobCreate";
import AdminJobApplicants from "./Pages/Applicants";
import { useSelector } from "react-redux";
import Nopage from "./Pages/Nopage";

const App = () => {
  const user = useSelector((state)=>state.auth.user)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDetail />} />

        {/* Recruiter Routes */}
        {user && user?.role === "recruiter" && (
          <>
            <Route path="/admin/companies" element={<Companies />} />
            <Route path="/admin/companies/create" element={<CompanyCreate />} />
            <Route path="/admin/companies/:id" element={<CompanySetup />} />
            <Route path="/admin/jobs" element={<AdminJob />} />
            <Route path="/admin/job/create" element={<AdminJobCreate />} />
            <Route path="/admin/job/applicants/:id"  element={<AdminJobApplicants />}
            />
          </>
        )}

        <Route path="/*" element={<Nopage/>}/>
      </Routes>
    </>
  );
};

export default App;
