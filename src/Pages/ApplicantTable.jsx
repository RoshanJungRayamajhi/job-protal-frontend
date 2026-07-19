import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATIONAPI_URI } from "@/util/constant";
import { setapplicants } from "@/Redux/applicationSlice";

const ApplicantTable = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);
  const shortlisting = ["accepted", "rejected"];

  const getStatus = (applicant) => applicant.status || "pending";

  const statushandler = async (id, status) => {
    try {
      const response = await axios.post(
        `${APPLICATIONAPI_URI}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      
      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Status updated successfully");
        
        // Update the applicants array with the new status
        const updatedApplicants = applicants.map((applicant) =>
          applicant._id === id
            ? { ...applicant, status: status }
            : applicant
        );
        
        dispatch(setapplicants(updatedApplicants));
      } else {
        toast.error("Status update failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status.");
    }
  };

  return (
    <Table>
      <TableCaption className="text-lg font-semibold">
        A list of your applicants
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>ATS Score</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.length > 0 ? (
          applicants.map((applicant) => {
            return (
              <TableRow key={applicant._id}>
                <TableCell>{applicant.applicant.fullname}</TableCell>
                <TableCell>{applicant.applicant.email}</TableCell>
                <TableCell>{applicant.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {applicant?.applicant?.profile?.resume ? (
                    <a
                      href={applicant?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-red-500">No Resume</span>
                  )}
                </TableCell>
                <TableCell>
                  {applicant?.applicant?.profile?.atsScore != null ? (
                    <span
                      className={
                        applicant.applicant.profile.atsScore >= 70
                          ? "text-green-600 font-semibold"
                          : applicant.applicant.profile.atsScore >= 40
                          ? "text-yellow-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {applicant.applicant.profile.atsScore}%
                    </span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {applicant?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                      getStatus(applicant) === "accepted"
                        ? "bg-green-100 text-green-800"
                        : getStatus(applicant) === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getStatus(applicant)}
                  </span>
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-slate-100 transition">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 w-fit">
                      {shortlisting.map((status) => {
                        const active = getStatus(applicant) === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            className={`text-left flex items-center gap-2 border-b-[1px] px-2 py-2 capitalize hover:bg-slate-100 ${
                              active ? "bg-slate-200 font-semibold" : ""
                            }`}
                            onClick={() => statushandler(applicant._id, status)}
                          >
                            <span className="text-sm">{status}</span>
                            {active && (
                              <span className="text-xs uppercase text-green-600">
                                selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No applicants found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantTable;
