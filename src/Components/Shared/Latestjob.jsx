import React from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const Latestjob = () => {
  const { alljobs } = useSelector((state) => state.job);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Section header */}
      <div className="text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-emerald-600">
          Explore Opportunities
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Latest &amp; Top
          </span>{" "}
          Job Openings
        </h2>
        <p className="mx-auto mt-3 max-w-md text-zinc-500">
          Hand-picked roles from top companies, updated daily.
        </p>
      </div>

      {/* Job grid */}
      {alljobs?.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alljobs.slice(0, 6).map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 py-16 text-center text-zinc-400">
          No job openings available right now. Check back soon!
        </div>
      )}
    </section>
  );
};

export default Latestjob;
