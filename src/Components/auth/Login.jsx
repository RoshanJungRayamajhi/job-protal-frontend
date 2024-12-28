import React from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setuser } from "../../Redux/authSlice.js";

import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      dispatch(setloading(true));
      
      const resp = await axios.post(
        "http://localhost:8000/api/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials:true,
        }
      );
  
      // Store token in localStorage
      localStorage.setItem("token", resp.data.token);
  
      // Dispatch user data to Redux store
      dispatch(setuser(resp.data.user));
      
      console.log(resp.data);
  
      // Show success message
      toast.success(resp.data.message);
  
      // Redirect user after login
      navigate("/");
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response?.data?.message || error.message || "An unexpected error occurred";
      console.error(errorMessage);
  
      // Show error toast
      toast.error(errorMessage);
    } finally {
      // Stop loading state
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
          <h1 className="text-2xl mb-5">Login</h1>

          <div className="my-2">
            <Label htmlFor="email" className="text-xl">
              Email
            </Label>
            <Input
              {...register("email", { required: "Email is required" })}
              id="email"
              className="mt-3"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="my-2">
            <Label htmlFor="password" className="text-xl">
              Password
            </Label>
            <Input
              {...register("password", { required: "Password is required" })}
              id="password"
              className="mt-3"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="my-4">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  value="student"
                  id="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  value="recruiter"
                  id="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <Button type="submit" className="w-full my-2">
              Login
            </Button>
          )}

          <span>
            Don't have an account?{" "}
            <Link className="text-blue-700" to="/signup">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
