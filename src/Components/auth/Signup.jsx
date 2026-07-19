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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: null,
    },
  });
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
    }

    try {
      dispatch(setloading(true));
      const res = await axios.post(
        "https://jobprotal-backend.onrender.com/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setuser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
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
              {...register("fullname", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Full name must not exceed 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name can only contain letters and spaces",
                },
              })}
              className="mt-3"
              type="text"
              placeholder="Full Name"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <Label className="text-xl">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-3"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <Label className="text-xl">Phone Number</Label>
            <Input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Phone number must be 10-15 digits",
                },
              })}
              className="mt-3"
              type="text"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <Label className="text-xl">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
              })}
              className="mt-3"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="my-4">
            <Label className="text-xl mb-2 block">Role</Label>
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: "Please select a role" })}
                  value="student"
                  type="radio"
                  id="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: "Please select a role" })}
                  type="radio"
                  value="recruiter"
                  id="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="my-4">
            <Label className="text-xl mb-2 block">Profile Picture</Label>
            <Input
              {...register("file", {
                required: "Profile picture is required",
                validate: {
                  fileSize: (files) => {
                    if (files && files.length > 0) {
                      const file = files[0];
                      return (
                        file.size <= 5000000 ||
                        "File size must be less than 5MB"
                      );
                    }
                    return true;
                  },
                  fileType: (files) => {
                    if (files && files.length > 0) {
                      const file = files[0];
                      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                      return (
                        validTypes.includes(file.type) ||
                        "Only image files (JPEG, PNG, GIF) are allowed"
                      );
                    }
                    return true;
                  },
                },
              })}
              accept="image/*"
              type="file"
              className="cursor-pointer"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">
                {errors.file.message}
              </p>
            )}
          </div>

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
            Already have an account?{" "}
            <Link className="text-blue-700" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
