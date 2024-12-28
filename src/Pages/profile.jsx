import AppliedJobtable from "@/Components/Shared/AppliedJobtable";
import Navbar from "@/Components/Shared/Navbar";
import UpdateProfileDailogue from "@/Components/Shared/UpdateProfileDailogue";
import useGetallappliedjobs from "@/CustomHook/useGetallappliedjobs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const profile = () => {
  const [resume, setresume] = useState(true);
  const [edit, setedit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  useGetallappliedjobs();
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10    ">
        <div className=" bg-blue-200 text-black px-10 rounded-3xl py-3">
          <div className=" flex items-center justify-between gap-4 mb-8">
            <div className="flex justify-between  items-center gap-4 w-[80%]">
             <div className=" w-20 h-20 rounded-full overflow-hidden ">
             <Avatar >
                <AvatarImage
                  className="object-cover w-full h-full"
                  src={user?.profile?.profilePhoto}
                />
              </Avatar>
             </div>
              <div className="details  text-left w-[80%]">
                <h1 className="text-2xl font-semibold my-2">
                  {user?.fullname}
                </h1>
                <p className="text-sm text-gray-800 w-full">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Pen
              className="w-8 h-8 cursor-pointer "
              onClick={() => setedit(!edit)}
            />
          </div>
          <div className="flex items-center gap-8 mt-4">
            <Mail className="w-6 h-6" />
            <p className="text-sm text-gray-800">{user?.email}</p>
          </div>
          <div className="flex items-center gap-8 mt-4">
            <Contact className="w-6 h-6" />
            <p className="text-sm text-gray-800">{user?.phoneNumber}</p>
          </div>
          <h1 className="text-xl font-semibold my-4 capitalize">skills</h1>
          <div className="skill flex items-center gap-4 overflow-x-auto  ">
            {Array.from(new Set(user?.profile?.skills || [])).map(
              (skill, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 px-4 text-white rounded-2xl capitalize"
                >
                  {skill}
                </div>
              )
            )}
          </div>
          <h1 className="text-xl font-semibold mt-3 mb-2 capitalize">Resume</h1>
          {user?.profile?.resume ? (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
            >
              {user.profile.resumeOriginalName || "Download Resume"}
            </a>
          ) : (
            <span>Nan</span>
          )}
        </div>

        {/* lower part */}
        <div className=" max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="text-xl font-semibold my-4">Applied Jobs</h1>
          <AppliedJobtable />
        </div>

        <UpdateProfileDailogue edit={edit} setedit={setedit} />
      </div>
    </>
  );
};

export default profile;
