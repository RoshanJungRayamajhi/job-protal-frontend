import Navbar from "@/Components/Shared/Navbar";
import { Button } from "@/Components/ui/Button";
import React, { useEffect, useState } from "react";
import Companytable from "./Companytable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetallcompanies from "@/CustomHook/useGetallcompanies";
import { setsearchcompany } from "@/Redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()  
    const [input, setinput] = useState("")
    useGetallcompanies()

    useEffect(() => {
          dispatch(setsearchcompany(input))
    }, [input])
    
   
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Company"
            onChange={(e)=>setinput(e.target.value)}

            className="w-fit p-2 rounded-md border border-gray-300"
          />
          <Button><Link to="/admin/companies/create">Add Company</Link></Button>
        </div>
        <Companytable />
      </div>
    </>
  );
};

export default Companies;
