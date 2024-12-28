import React from "react";
import { Button } from "../ui/Button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const dataAgoFunction = (createdAt) => {
    const data = new Date(createdAt);
    const now = new Date();
    const diffTime = now - data;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="shadow-xl p-4 rounded-2xl flex flex-col justify-between">
      <div className=" flex justify-between items-center">
        <p className=" text-base font-medium text-zinc-700">
          {dataAgoFunction(job?.createdAt)} day ago
        </p>
        <Button variant="outline" size="icon" className="bg-white rounded-full">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-white rounded-full" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div className="flex flex-col ">
          <h1 className=" text-xl font-semibold capitalize">
            {" "}
            {job?.company?.name}
          </h1>
          <p className=" text-sm text-zinc-700">{job?.location}</p>
        </div>
        
      </div>
      <div className="my-2">
        <h1 className=" font-semibold text-lg">{job?.title}</h1>
        <p className="text-sm font-normal">{job?.description}</p>
      </div>
      <div className="flex flex-wrap justify-between  items-center gap-2">
        <button className="  text-black border-[1px] border-zinc-700 px-2 py-[1px] rounded-md whitespace-nowrap">
          {job?.jobType}
        </button>
        <button className="  text-black border-[1px] border-zinc-700 px-2 py-[1px] rounded-md">
          {job?.salary}
        </button>
        <button className="  text-black border-[1px] border-zinc-700 px-2 py-[1px] rounded-md">
          {job?.position} positions
        </button>
      </div>
      <div className=" flex flex-wrap items-center justify-between my-4 text-lg font-semibold ">
        <Link
          to={`/description/${job?._id}`}
          className=" bg-zinc-700 text-white px-3 py-1 rounded-md"
        >
          Details
        </Link>
        <Link
          to="/job/save"
          className=" bg-zinc-700 text-white px-3 py-1 rounded-md"
        >
          Save for later
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
