import React from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/Redux/authSlice";
import { setuser } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  let { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    } else {
      console.error("No file selected");
      toast.error("Please select a file to upload");
      return;
    }

    try {
      dispatch(setloading(true));
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials:true,
        }
      );
      if (res.data.success) {
        dispatch(setuser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 mt-4 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="text-2xl mb-5">Signup</h1>
          <div className="my-2">
            <Label className="text-xl">Full Name</Label>
            <Input
              {...register("fullname", { required: true })}
              className="mt-3"
              type="text"
              placeholder="fullname"
            />
          </div>
          <div className="my-2">
            <Label className="text-xl">Email</Label>
            <Input
              {...register("email", { required: true })}
              className="mt-3"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="my-2">
            <Label className="text-xl">Phone Number</Label>
            <Input
              {...register("phoneNumber", { required: true })}
              className="mt-3"
              type="text"
              placeholder="phoneNumber"
            />
          </div>
          <div className="my-2">
            <Label className="text-xl">Password</Label>
            <Input
              {...register("password", { required: true })}
              className="mt-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: true })}
                  value="student"
                  type="radio"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: true })}
                  type="radio"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
              <div className="flex items-center gap-4 my-2">
                <Label>Profile</Label>
                <Input
                  {...register("file", { required: true })}
                  accept="image/*"
                  type="file"
                  className="cursor-pointer w-1/2"
                />
              </div>
            </RadioGroup>
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <Button type="submit" className="w-full my-2">
                Signup
              </Button>
            )}
            <span>
              Already have an account?
              <Link className="text-blue-700" to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
