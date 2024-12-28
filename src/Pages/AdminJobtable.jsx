import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  TableCaption,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/Components/ui/table";
import useGetsinglecompanies from "@/CustomHook/useGetsinglecompanies";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobtable = () => {
  const { alladminjobs, searchjob } = useSelector((state) => state?.job);
  const navigate = useNavigate();
  const [filterjob, setfilterjob] = useState(alladminjobs);

  useEffect(() => {
    const filteredadminjobs = alladminjobs.filter((job) =>
      job.title.toLowerCase().includes(searchjob.toLowerCase())
    );
    setfilterjob(filteredadminjobs);
  }, [alladminjobs, searchjob]);

  return (
    <div className=" max-w-5xl mx-auto mt-10">
      <Table>
        <TableCaption>A list of your jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterjob.length > 0 ? (
            filterjob.map((job) => {
              return (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className=" gap-2 w-fit cursor-pointer">
                        <div className=" flex items-center gap-2">
                          <Edit2 className=" w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/job/applicants/${job._id}`)
                          }
                          className=" flex items-center gap-2"
                        >
                          <Eye />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <h1>No jobs found</h1>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobtable;
