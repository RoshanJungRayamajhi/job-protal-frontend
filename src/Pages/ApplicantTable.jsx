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
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const ApplicantTable = () => {
  const { applicants } = useSelector((state) => state.application);
  const shortlisting = ["accepted", "rejected"];

  const statushandler = async (id, status) => {
    const response = await axios.post(
      `https://jobprotal-backend.onrender.com/api/application/status/${id}/update`,
      { status },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast.success("Status updated successfully");
    } else {
      toast.error("Status update failed");
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
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.length > 0 ? (
          applicants.map((applicant) => {
            return (
              <TableRow>
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
                  {applicant?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className=" flex flex-col gap-4 w-fit cursor-pointer">
                      {shortlisting.map((status) => {
                        return (
                          <div
                            className=" flex items-center gap-2 border-b-[1px] capitalize "
                            onClick={() => statushandler(applicant._id, status)}
                          >
                            <span className="text-sm">{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <h1>No applicants found</h1>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantTable;
