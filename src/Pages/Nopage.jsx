import { infinity } from "ldrs";
import React from "react";

const Nopage = () => {
  infinity.register();
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-black text-white">
     <div className=" flex flex-col justify-center items-center gap-4">
     <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="white"
      ></l-infinity>
      <h1 className="text-4xl font-bold">404 Page not found</h1>
     </div>
    </div>
  );
};

export default Nopage;
