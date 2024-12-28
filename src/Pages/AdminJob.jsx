import Navbar from "@/Components/Shared/Navbar";
import { Button } from "@/Components/ui/Button";
import React, { useEffect, useState } from "react";
import Companytable from "./Companytable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetallcompanies from "@/CustomHook/useGetallcompanies";
import { setsearchjob } from "@/Redux/jobSlice";
import AdminJobtable from "./AdminJobtable";
import useGetalladminjobs from "@/CustomHook/useGetalladminjobs";

const AdminJob = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()  
    const [input, setinput] = useState("")
    useGetalladminjobs();

    useEffect(() => {
          dispatch(setsearchjob(input))
    }, [input])
    
   
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search job"
            onChange={(e)=>setinput(e.target.value)}

            className="w-fit p-2 rounded-md border border-gray-300"
          />
          <Button><Link to="/admin/job/create">Add job</Link></Button>
        </div>
        <AdminJobtable />
      </div>
    </>
  );
};

export default AdminJob;

