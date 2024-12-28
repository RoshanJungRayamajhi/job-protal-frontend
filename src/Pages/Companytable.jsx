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
import { Edit2, MoreHorizontal } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companytable = () => {
  const { allcompanies, searchcompany } = useSelector(
    (state) => state?.company
  );
  const navigate = useNavigate();
  const [filtercompany, setfiltercompany] = useState(allcompanies);
 
  const handlecompany = (id) => {
    navigate(`/admin/companies/${id}`);

  };

  useEffect(() => {
    const filteredcompanies = allcompanies.filter((company) =>
      company.name.toLowerCase().includes(searchcompany.toLowerCase())
    );
    setfiltercompany(filteredcompanies);
  }, [allcompanies, searchcompany]);

  return (
    <div className=" max-w-5xl mx-auto mt-10">
      <Table>
        <TableCaption>A list of your companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtercompany.length > 0 ? (
            filtercompany.map((company) => {
              return (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        className="w-10 h-10 rounded-full overflow-hidden"
                        src={company?.logo}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent
                        onClick={() =>handlecompany(company._id)}
                        className=" flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className=" w-4" />
                        <span>Edit</span>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <h1>No companies found</h1>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Companytable;
