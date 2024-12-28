import Navbar from "@/Components/Shared/Navbar";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePerson2 } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetsinglejob from "@/CustomHook/useGetsinglejob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setsinglejob } from "@/Redux/jobSlice";
import { Button } from "@/Components/ui/Button";

const JobDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singlejob = useSelector((state) => state.job.singlejob);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const navigate = useNavigate();

  let result;
  const [isAppplied, setisAppplied] = useState(result);
  // Call the custom hook or dispatch an action to fetch job details
  useGetsinglejob(id);

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/application/apply/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const applicants = response.data.job.applicants;
        const isresult = applicants.includes(userId);
        setisAppplied(isresult);
        dispatch(setsinglejob(response.data.job));
        toast.success(response.data.message);
      } else {
        setisAppplied(false);
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const dataAgoFunction = (createdAt) => {
    const data = new Date(createdAt);
    const now = new Date();
    const diffTime = now - data;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };
  useEffect(() => {
    result = singlejob?.applicants?.includes(userId) || false;
    setisAppplied(result);
  }, [singlejob]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 bg-blue-200 text-black px-10 py-6 flex justify-between rounded-md">
        <div className="flex gap-20">
          <div className="flex flex-col">
            <img
              className="bg-center bg-cover h-20 w-20 rounded-md"
              src={singlejob?.company?.logo}
              alt=""
            />
            <p className="text-lg">{singlejob?.company?.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold capitalize mb-2">
              {singlejob?.title}
            </h1>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-xl" />
              <p className="text-lg">{singlejob?.location}</p>
              <MdOutlinePerson2 className="text-xl ml-5" />
              <p className="text-lg">{singlejob?.position}--positions</p>
              <PiMoneyWavyLight className="text-xl ml-5" />
              <p className="text-lg">Rs.{singlejob?.salary}</p>
              <IoPeople className="text-xl ml-5" />
              <p className="text-lg">{singlejob?.jobType}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            onClick={handleApply}
            disabled={isAppplied}
            className={`${
              isAppplied ? "cursor-not-allowed" : "cursor-pointer"
            } bg-blue-400 text-white px-3 py-2 text-xl font-semibold rounded-md`}
          >
            {isAppplied ? "Already Applied" : "Apply Now"}
          </button>
          <p className="text-base capitalize text-black pt-2">
            posted {dataAgoFunction(singlejob?.createdAt)} days ago
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 text-black pb-20">
        <h1 className="text-2xl font-semibold capitalize mb-2">
          Job description
        </h1>
        <p className="text-lg font-normal mb-4 leading-5 w-[75%]">
          {singlejob?.description}
        </p>

        <h1 className=" text-2xl font-semibold capitalize mb-2">
          skill Requirements
        </h1>
        <div className="text-lg font-normal mb-4 leading-5 w-[75%] flex flex-col gap-2">
          <p className="flex flex-wrap gap-2">
            {singlejob?.requirements?.map((item, index) => {
              return (
                <Button className="font-semibold capitalize" key={index}>
                  {item}
                </Button>
              );
            })}
          </p>
        </div>
        <button
          onClick={handleApply}
          disabled={isAppplied}
          className={`bg-blue-400 text-white px-3 py-2 text-xl font-semibold rounded-md ${
            isAppplied ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isAppplied ? "Already Applied" : "Apply Now"}
        </button>
        <button onClick={()=>navigate(-1)} className=" block mt-5 text-black px-3 py-2 text-xl font-semibold rounded-md">
          Back
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
