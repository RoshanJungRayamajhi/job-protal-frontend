import Navbar from "@/Components/Shared/Navbar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { setapplicants } from "@/Redux/applicationSlice";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ApplicantTable from "./ApplicantTable";
import { APPLICATIONAPI_URI } from "@/util/constant";

const Applicants = () => {
  const filterjob = [1, 2, 3, 4, 5];
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const getApplicants = async () => {
    try {
      const response = await axios.get(
        `${APPLICATIONAPI_URI}/get/${id}`,
        {
          withCredentials: true,
        }
      );
 
      dispatch(setapplicants(response.data.applicant));
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

    };
    getApplicants();
  }, [dispatch,id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mt-6">Applicants  </h1>
       <ApplicantTable/>
      </div>
    </div>
  );
};

export default Applicants;
