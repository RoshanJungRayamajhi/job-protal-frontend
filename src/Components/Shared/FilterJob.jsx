import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setquery } from "@/Redux/jobSlice";

const FilterJob = () => {
  const filters = [
    {
      filterType: "Location",
      array: ["Kathmandu","butwal", "Pokhara", "Lalitpur", "Biratnagar", "Chitwan"],
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Software Engineer"],
    },
  ];
  
    const [selectedvalue, setselectedvalue] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
     const handleFilter = (item)=>{
      setselectedvalue(item)
    }
    useEffect(() => {
      dispatch(setquery(selectedvalue))
    
    }, [selectedvalue])
    

  return (
    <div>
      <h1 className="text-xl font-semibold text-green-500">Filter Job</h1>
      <hr className="my-4" />

      {filters.map((filter, index) => (
        <div key={index} className="my-4">
          <h1 className="font-medium mb-2">{filter.filterType}</h1>
            <RadioGroup>
            {filter.array.map((item, index) => {
              return (
                <div key={index}>
                  <RadioGroupItem onClick={()=>handleFilter(item)} value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterJob;
