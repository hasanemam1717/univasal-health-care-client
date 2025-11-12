"use client";

import DoctorCard from "@/components/modules/doctor/doctorCard";
import { getDoctors } from "@/components/services/Doctor";
import { DoctorResponse, TDoctor } from "@/types/doctor";
import React, { useEffect, useState } from "react";

const DoctorsPage = () => {
  const [doctorData, setDoctorData] = useState<DoctorResponse | null>(null);

  useEffect(() => {
    getDoctors()
      .then(setDoctorData)
      .catch((err) => console.error("Error:", err));
  }, []);

  console.log(doctorData);

  return (
    <div className="min-h-screen container mx-auto  flex flex-col ">
      <div className="backdrop-blur-md shadow-lg p-3 lg:p-5 w-full ">
        <h1 className="text-3xl font-bold  text-center text-indigo-700 mb-4">
          Welcome to Universal Health Care Client
        </h1>
        {doctorData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {doctorData?.data?.map((doctor: TDoctor, index: number) => (
              <DoctorCard key={index} doctor={doctor}></DoctorCard>
            ))}
          </div>
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
