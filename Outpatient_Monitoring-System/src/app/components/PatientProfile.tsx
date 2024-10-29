"use client"
import Image from "next/image";
import React, { useState } from "react";
import PatientProfilePic from "@/public/images/patient.png";
import TreatmentStatus from "./TreatmentStatus";
import { MdVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";


const PatientProfile: React.FC = () => {
    const [istreated, isSetTreated] = useState(true);
    console.log(isSetTreated);
    

    return (
        <div className="bg-white px-6 py-8 rounded-lg flex flex-col items-center gap-4 w-1/3">
        <div className="flex items-center justify-between px-6 gap-6 w-full">
          <Image
            className="w-[80px] p-2 bg-primary rounded-full"
            src={PatientProfilePic}
            alt="Patient Profile"
          />
          <div className="flex flex-col gap-2">
            <p className="text-xl">Jane Cooper</p>
            <TreatmentStatus />
          </div>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="text-lg">Treatment</p>
          <p>:</p>
          <p className="text-lg">Diabetes</p>
        </div>
        {istreated ?  <div className="border-green-700 border flex w-full justify-between items-center gap-6 px-4 py-2 rounded">
          <MdVerified color="green" size="40" />
          <div className=" flex flex-col justify-center items-start px-8">
            <p className="text-green-700">Had a treatment on</p>
            <p className="text-green-700">15/03/2024</p>
          </div>
        </div> :  <div className="border-red-600 border flex w-full justify-between items-center gap-6 px-4 py-2 rounded">
          <RxCrossCircled  color="red" size="40" />
          <div className=" flex flex-col justify-center items-start px-8">
            <p className="text-red-600">Did not come on</p>
            <p className="text-red-600">15/03/2024</p>
          </div>
        </div>}
       
      </div>
    )
}

export default PatientProfile;
