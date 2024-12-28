import React from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const Latestjob = () => {

  const {alljobs} = useSelector(state=>state.job)
  return (
    <div className="max-w-6xl  mx-auto mt-10  ">
      <h1 className=" text-4xl font-semibold capitalize">
        <span className="mx-auto pr-3 text-green-400">latest and top</span>Job
        openings
      </h1>
      <div className=" grid grid-cols-3 gap-4 my-10">
        {alljobs.slice(0, 6).map((job, index) => (
         <JobCard job={job} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Latestjob;
