import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setquery } from "@/Redux/jobSlice";

const CategoryCrausal = () => {
  const categories = [
    "frontend",
    "backend",
    "fullstack",
    "app development",
    "uiux",
    "devops",
    "data",
    "ai",
];
const dispatch = useDispatch()
const navigate = useNavigate()
const handleCategory = (category)=>{
  dispatch(setquery(category))
  navigate("/browse")
}
  return (
    <div>
      <Carousel className="  max-w-xl mx-auto">
        <CarouselContent className="flex  gap-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={()=>handleCategory(category)} variant="outline" className=" uppercase text-black font-semibold text-sm rounded-full">{category}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext/>
        <CarouselPrevious/>
      </Carousel>
    </div>
  );
};

export default CategoryCrausal;
