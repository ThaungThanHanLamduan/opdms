import { StatCardProps } from '@/types/patientTypes';
import React from 'react'
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
 
  
  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value }) => (
    <div className="flex gap-3 items-center px-16 py-4">
      <Icon className="border rounded-full p-2 bg-primary text-white" size={50} />
      <div className="flex flex-col justify-between items-start gap-1">
        <p className="text-gray-400">{title}</p>
        <p className="text-black text-lg font-semibold">{value}</p>
      </div>
    </div>
  );

const OverviewPatient = () => {
  return (
    <div className="w-full rounded-full bg-white flex justify-between items-center">
        <StatCard icon={FaUserGroup} title="Total Patients" value="1000" />
        <StatCard
          icon={BsFillPersonCheckFill}
          title="Treated Patients"
          value="1000"
        />
        <StatCard
          icon={BsFillPersonXFill}
          title="Untreated Patients"
          value="1000"
        />
      </div>
  )
}

export default OverviewPatient