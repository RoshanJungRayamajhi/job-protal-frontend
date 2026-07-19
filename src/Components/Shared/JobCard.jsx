import React from "react";
import { Button } from "../ui/Button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const daysAgo = (createdAt) => {
    const diff = new Date() - new Date(createdAt);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50">
      {/* Top row: date + bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-400">
          {daysAgo(job?.createdAt)}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-200 text-zinc-400 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Company */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold capitalize text-zinc-900">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-zinc-500">{job?.location}</p>
        </div>
      </div>

      {/* Title + description */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-zinc-900 transition group-hover:text-emerald-700">
          {job?.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {job?.jobType}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          {job?.salary}
        </span>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          {job?.position} positions
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4">
        <Link
          to={`/description/${job?._id}`}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-95"
        >
          View Details
        </Link>
        <Link
          to="/job/save"
          className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600"
        >
          Save for Later
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
