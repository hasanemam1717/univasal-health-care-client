"use client";

import { TDoctor } from "@/types/doctor";
import Image from "next/image";
import React from "react";
import maleDoctorIMG from "../../../../public/doctor/maleDoctor.jpg";
import femaleDoctorIMG from "../../../../public/doctor/femaleDoctor.jpg";

const DoctorCard: React.FC<{ doctor: TDoctor }> = ({ doctor }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto border border-indigo-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center p-6 gap-6">
        <div className="flex-shrink-0">
          <Image
            src={
              doctor.profilePhoto && doctor.profilePhoto.trim() !== ""
                ? doctor.profilePhoto
                : doctor.gender === "MALE"
                ? maleDoctorIMG
                : femaleDoctorIMG
            }
            alt={doctor.name}
            width={100}
            height={100}
            className="rounded-full w-20 h-20 object-cover  border-4 border-indigo-500"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-700">{doctor.name}</h2>
          <p className="text-sm text-gray-600">{doctor.designation}</p>
          <p className="text-sm text-gray-500">{doctor.currentWorkingPlace}</p>
        </div>
      </div>
      <div className="px-6 pb-6 text-sm text-gray-700 space-y-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <p>
            <span className="font-semibold">Email:</span> {doctor.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {doctor.contactNumber}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {doctor.address}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {doctor.gender}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {doctor.experience} yrs
          </p>
          <p>
            <span className="font-semibold">Fee:</span> ৳{doctor.appointmentFee}
          </p>
          <p>
            <span className="font-semibold">Reg. No:</span>{" "}
            {doctor.registrationNumber}
          </p>
          <p>
            <span className="font-semibold">Qualification:</span>{" "}
            {doctor.qualification}
          </p>
        </div>
        {doctor.averageRating !== null && (
          <p className="pt-2 text-indigo-600 font-medium">
            ⭐ Average Rating: {doctor.averageRating}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
