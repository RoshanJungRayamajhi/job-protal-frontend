import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setuser } from "../../Redux/authSlice";
import { AUTHAPI_URI } from "@/util/constant";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = async () => {
    try {
      const response = await axios.get(`${AUTHAPI_URI}/logout`,{
        withCredentials:true
      }
      );
      dispatch(setuser(null));
      
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(response.message);
    }
  };
  return (
    <div className=" flex items-center justify-between mx-auto max-w-[84vw] h-16 ">
      <div>
        <h1 className=" text-4xl font-semibold">
          Job<span className=" text-green-400">Protal</span>
        </h1>
      </div>
      <div className=" flex items-center justify-center gap-14 font-semibold text-xl capitalize">
       {
        user && user.role === "recruiter" ?(
          <>
          <Link to="/">Companies</Link>
          <Link to={user.role === "recruiter" ? "/admin/jobs" : "/jobs"}>job</Link>
          </>
        ):(
          <>
          <Link to="/">Home</Link>
          <Link to="/jobs">job</Link>
          </>

        )
       }
       
       
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className=" w-[20vw] flex items-center gap-2 capitalize">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className=" font-semibold  text-xl whitespace-nowrap">
                    {user.fullname}
                  </h4>
                  <p className="mt-1 text-sm tracking-tighter leading-none">
                    {user.email}
                  </p>
                </div>
              </div>
              {
                user.role === "student" &&<div className=" flex items-center gap-2">
                <User2 />
                <Button
                  variant="link"
                  className="capitalize font-semibold text-base"
                >
                  <Link to="/profile">View profile</Link>
                </Button>
              </div>

              }
              
              <div onClick={handlelogout} className=" flex items-center gap-2">
                <LogOut />
                <Button className="text-base capitalize" variant="link">
                  logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <Button className=" text-xl" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className=" text-xl" variant="outline">
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
