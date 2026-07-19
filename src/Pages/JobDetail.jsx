import Navbar from "@/Components/Shared/Navbar";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePerson2 } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { ArrowLeft } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetsinglejob from "@/CustomHook/useGetsinglejob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setsinglejob } from "@/Redux/jobSlice";

const JobDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singlejob = useSelector((state) => state.job.singlejob);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const navigate = useNavigate();

  const [isApplied, setIsApplied] = useState(false);
  useGetsinglejob(id);

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `https://jobprotal-backend.onrender.com/api/application/apply/${id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsApplied(response.data.job.applicants.includes(userId));
        dispatch(setsinglejob(response.data.job));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const daysAgo = (createdAt) => {
    const days = Math.floor(
      (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
    );
    return days === 0 ? "today" : `${days} day${days > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    setIsApplied(singlejob?.applicants?.includes(userId) || false);
  }, [singlejob, userId]);

  const metaItems = [
    { icon: <CiLocationOn />, label: singlejob?.location },
    { icon: <MdOutlinePerson2 />, label: `${singlejob?.position} positions` },
    { icon: <PiMoneyWavyLight />, label: `Rs. ${singlejob?.salary}` },
    { icon: <IoPeople />, label: singlejob?.jobType },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-emerald-600"
        >
          <ArrowLeft size={16} /> Back to jobs
        </button>

        {/* Header card */}
        <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <img
              className="h-16 w-16 rounded-xl border border-zinc-100 object-cover"
              src={singlejob?.company?.logo}
              alt={singlejob?.company?.name}
            />
            <div>
              <p className="text-sm font-medium text-emerald-600">
                {singlejob?.company?.name}
              </p>
              <h1 className="mt-1 text-3xl font-bold capitalize tracking-tight text-zinc-900">
                {singlejob?.title}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {metaItems.map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1 text-sm text-zinc-600"
                  >
                    <span className="text-emerald-600">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <button
              onClick={handleApply}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2.5 font-semibold text-white transition ${
                isApplied
                  ? "cursor-not-allowed bg-zinc-300"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
            <p className="text-xs text-zinc-400">
              Posted {daysAgo(singlejob?.createdAt)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900">Job Description</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-600">
            {singlejob?.description}
          </p>

          <h2 className="mt-8 text-xl font-bold text-zinc-900">
            Skill Requirements
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {singlejob?.requirements?.map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium capitalize text-emerald-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default JobDetail;
