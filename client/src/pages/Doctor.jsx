import React from "react";
import { doctorData } from "../util/data.js";
import DoctorCard from "./DoctorCard";

const Doctor = () => {
  return (
    <div className="p-4 mt-14">
      <h2 className="text-[50px] font-bold">Doctor Recommendation</h2>

      <p className="mt-1 text-gray-600">
        Select the type of treatment you need
      </p>

      <div className="flex flex-wrap gap-5 mt-5">
        {doctorData.map((doc, index) => (
          <DoctorCard key={index} {...doc} />
        ))}
      </div>
    </div>
  );
};

export default Doctor;