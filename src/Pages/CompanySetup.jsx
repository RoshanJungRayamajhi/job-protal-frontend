import Navbar from "@/Components/Shared/Navbar";
import { Button } from "@/Components/ui/Button";
import { setloading } from "@/Redux/authSlice";
import { setsinglecompany } from "@/Redux/companySlice";
import { COMPANYAPI_URI } from "@/util/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompanySetup = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    const getSingleCompany = async () => {
      try {
        const response = await axios.get(
          `${COMPANYAPI_URI}/get/${id}`,
          { withCredentials: true }
        );
        if (response?.data?.success) {
          dispatch(setsinglecompany(response?.data?.company));
          const company = response?.data?.company;
          setValue("name", company?.name || "");
          setValue("description", company?.description || "");
          setValue("website", company?.website || "");
          setValue("location", company?.location || "");
          setValue("file", company?.logo || "");
        } else {
          toast.error("Failed to fetch company details.");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching company details."
        );
      }
    };
    getSingleCompany();
  }, [dispatch, id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("website", data.website);
    formData.append("location", data.location);
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }
 
    try {
      dispatch(setloading(true));
      const response = await axios.post(
        `http://localhost:8000/api/company/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        dispatch(setsinglecompany(response?.data?.company));
        toast.success(response?.data?.message);
        navigate("/admin/companies");
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
      <div className="mx-auto max-w-3xl mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center my-10">
            <h1
              onClick={() => navigate(-1)}
              className="w-[10%] px-6 py-2 border-2 border-gray-300 font-semibold capitalize cursor-pointer rounded-md"
            >
              Back
            </h1>
            <h1 className="flex-1 text-2xl font-semibold text-center">
              Company Setup
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 my-3">
            <div>
              <label className="text-center text-xl font-semibold block">
                Company Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Company Description
              </label>
              <input
                {...register("description")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Company Website
              </label>
              <input
                {...register("website")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Company Location
              </label>
              <input
                {...register("location")}
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="text-center text-xl font-semibold block">
                Company Logo
              </label>
              <input
                {...register("file")}
                type="file"
                accept="image/*"
                className="w-full p-2 rounded-md"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <Button type="submit" className="w-full my-2">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
