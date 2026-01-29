import { setquery } from "@/Redux/jobSlice";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [input, setinput] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = ()=>{
    dispatch(setquery(input))
    navigate("/browse")
  }
  return (
    <div>
      <div className="mt-10 text-2xl  w-fit mx-auto h-10 whitespace-nowrap bg-zinc-600  text-green-400  capitalize rounded-lg px-2 py-1 ">
        No.1 job hunt website
      </div>
      <div className=" mx-auto text-center py-10">
        <h1 className=" text-6xl font-semibold">Search, Apply</h1>
        <h1 className=" text-6xl font-semibold">Get your dream job</h1>
        <p className=" text-xl text-zinc-900 font-semibold mt-10 w-1/2 mx-auto">
          Your career journey is unique—every application brings you closer to
          the opportunity that's meant for you. Stay persistent and keep
          believing in yourself!
        </p>
       
      </div>
    </div>
  );
};

export default Hero;
