import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });
  const { loading } = useSelector((state) => state.auth);
  console.log(loading, "loading state");

  const onSubmit = async (data) => {
    try {
      dispatch(setloading(true));

      const resp = await axios.post(
        "https://jobprotal-backend.onrender.com/api/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
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
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
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
            <Label htmlFor="password" className="text-xl">
              Password
            </Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              id="password"
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
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  {...register("role", { required: "Please select a role" })}
                  type="radio"
                  value="student"
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
              Register here
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
