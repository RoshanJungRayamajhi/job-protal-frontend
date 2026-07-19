import Navbar from "@/Components/Shared/Navbar";
import { Button } from "@/Components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { setloading } from "@/Redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminJobCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      jobType: "",
      experience: "",
      position: "",
      company: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { allcompanies } = useSelector((state) => state.company);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("requirements", data.requirements);
    formData.append("location", data.location);
    formData.append("salary", data.salary);
    formData.append("jobType", data.jobType);
    formData.append("experience", data.experience);
    formData.append("position", data.position);
    formData.append("company", data.company);

    try {
      dispatch(setloading(true));
      const response = await axios.post(
        `https://jobprotal-backend.onrender.com/api/job/post`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating job.");
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-3xl mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center my-6">
            <h1
              onClick={() => navigate(-1)}
              className="w-[10%] px-6 py-2 border-2 border-gray-300 font-semibold capitalize cursor-pointer rounded-md"
            >
              Back
            </h1>
            <h1 className="flex-1 text-2xl font-semibold text-center">
              Register Job
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 my-3">
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Title
              </label>
              <input
                {...register("title", {
                  required: "Job title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Description
              </label>
              <input
                {...register("description", {
                  required: "Job description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Requirements
              </label>
              <input
                {...register("requirements", {
                  required: "Job requirements are required",
                })}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Location
              </label>
              <input
                {...register("location", {
                  required: "Job location is required",
                })}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Salary
              </label>
              <input
                {...register("salary", {
                  required: "Job salary is required",
                  min: {
                    value: 0,
                    message: "Salary must be a positive number",
                  },
                })}
                type="number"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Type
              </label>
              <input
                {...register("jobType", {
                  required: "Job type is required",
                })}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobType.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Experience
              </label>
              <input
                {...register("experience", {
                  required: "Job experience is required",
                })}
                type="number"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>
           <div>
  <label className="text-center text-xl font-semibold block">
    Job Position
  </label>
  <input
    {...register("position", {
      required: "Job position is required",
      min: {
        value: 1,
        message: "Position must be at least 1",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Only numbers are allowed",
      },
    })}
    type="number"
    className="w-full p-2 rounded-md border border-gray-300"
  />
  {errors.position && (
    <p className="text-red-500 text-sm mt-1">
      {errors.position.message}
    </p>
  )}
</div>

            <div>
              <label className="text-center text-xl font-semibold block mb-2">
                Select Company
              </label>
              {allcompanies.length > 0 ? (
                <>
                  <Controller
                    name="company"
                    control={control}
                    rules={{ required: "Please select a company" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {allcompanies.map((company) => (
                              <SelectItem key={company._id} value={company._id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-red-500">
                  You have to register a company first
                </p>
              )}
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <Button type="submit" className="w-full my-2">
              Register
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminJobCreate;
