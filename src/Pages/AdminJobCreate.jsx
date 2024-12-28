import Navbar from "@/Components/Shared/Navbar";
import { Button } from "@/Components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { setloading } from "@/Redux/authSlice";
import { setsinglecompany } from "@/Redux/companySlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminJobCreate = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { singlecompany } = useSelector((state) => state.company);
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
        ` http://localhost:8000/api/job/post`,
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
      toast.error(error?.response?.data?.message || "Error updating company.");
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
                {...register("title")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Description
              </label>
              <input
                {...register("description")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Requirements
              </label>
              <input
                {...register("requirements")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Location
              </label>
              <input
                {...register("location")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Salary
              </label>
              <input
                {...register("salary")}
                type="number"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Type
              </label>
              <input
                {...register("jobType")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Experience
              </label>
              <input
                {...register("experience")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Job Position
              </label>
              <input
                {...register("position")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              {allcompanies.length > 0 ? (
                <Select onValueChange={(value)=>setValue("company",value)}>
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
              ) : (
                <p> you have to register company first</p>
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
