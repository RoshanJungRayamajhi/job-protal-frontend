import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { setloading, setuser } from "../../Redux/authSlice";
import { Loader2 } from "lucide-react";

const UpdateProfileDailogue = ({ edit, setedit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("bio", data.bio);
    formData.append("skills", data.skills);
    formData.append("file", data.file[0]);

    try {
      dispatch(setloading(true));
      const response = await axios.post(
        "http://localhost:8000/api/auth/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        dispatch(setuser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      console.log(error);
      toast.error(error.message);
    } finally {
      dispatch(setloading(false));
    }
    setedit(false);
  };
  return (
    <div>
      <Dialog open={edit}>
        <DialogContent onInteractOutside={() => setedit(false)}>
          <DialogHeader>
            <DialogTitle>update profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid">
              <div className="grid grid-cols-4 gap-4">
                <label htmlFor="name">Name</label>
                <input
                  {...register("fullname")}
                  defaultValue={user?.fullname}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="name"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email")}
                  defaultValue={user?.email}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  type="email"
                  placeholder="email"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <label htmlFor="phone">Phone</label>
                <input
                  {...register("phoneNumber")}
                  defaultValue={user?.phoneNumber}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  type="tel"
                  placeholder="phone number"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <label htmlFor="bio">Bio</label>
                <textarea
                  {...register("bio")}
                  defaultValue={user?.profile?.bio}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  placeholder="bio"
                  rows="8"
                ></textarea>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <label htmlFor="skills">Skills</label>
                <input
                  {...register("skills")}
                  defaultValue={user?.profile?.skills}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="skills (comma separated)"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <label htmlFor="resume">Resume</label>
                <input
                  {...register("file")}
                  defaultValue={user?.resume}
                  className="col-span-3 border-[1px] border-gray-300 rounded-md p-2"
                  name="file"
                  type="file"
                  accept="application/pdf"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Update"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDailogue;
