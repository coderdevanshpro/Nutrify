import React from "react";

const DoctorCard = ({ organ, specialist, description }) => {
  return (
    <div className="p-5 rounded-xl shadow-md bg-white w-[300px]">
      <h3 className="text-lg font-semibold">{organ}</h3>

      <p className="mt-1 font-bold text-gray-700">{specialist}</p>

      <p className="mt-2 text-gray-600">{description}</p>

      <button className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded-md cursor-pointer hover:bg-yellow-500 transition">
        Consult
      </button>
    </div>
  );
};

export default DoctorCard;