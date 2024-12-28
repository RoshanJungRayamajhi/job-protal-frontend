import FilterJob from "@/Components/Shared/FilterJob";
import JobCard from "@/Components/Shared/JobCard";
import Navbar from "@/Components/Shared/Navbar";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Job = () => {
  const jobs = useSelector((state) => state.job.alljobs) || []; // Ensure jobs is always an array
  const { query } = useSelector((state) => state.job); // Extract query from the state

  const [filterjob, setfilterjob] = useState([]);

  // Update filtered jobs whenever `jobs` or `query` changes
  useEffect(() => {
    if (query) {
      const filteredJobs = jobs.filter((job) => {
        // Handle cases where job properties might be null/undefined
        const title = job.title?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";

        return (
          title.includes(query.toLowerCase()) ||
          location.includes(query.toLowerCase()) ||
          description.includes(query.toLowerCase())
        );
      });

      setfilterjob(filteredJobs);
    } else {
      setfilterjob(jobs); // Show all jobs if no query
    }
  }, [jobs, query]);
  

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 flex gap-6">
        {/* Sidebar */}
        <div className="w-[20%] max-h-screen fixed   overflow-y-hidden">
          <FilterJob />
        </div>

        {/* Job Cards */}
        <div className="flex-1 grid  grid-rows-2 grid-cols-3 gap-8 pl-[20%]  overflow-y-auto">
          {filterjob.length > 0 ? (
            filterjob.map((job, index) => <JobCard job={job} key={index} />)
          ) : (
            <div className="text-center text-2xl font-semibold">
              No job found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
