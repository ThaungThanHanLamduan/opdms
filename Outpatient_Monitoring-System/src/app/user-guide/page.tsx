"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

const Accordion = ({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-300">
      <button
        className={`w-full text-left flex justify-between items-center py-4 px-4 font-semibold ${isOpen ? 'bg-slate-50 text-black' : 'bg-white text-black'}`}
        onClick={onClick}
      >
        <span>{title}</span>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      
      {/* Animate content appearance using framer-motion */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="bg-white text-black p-4">{content}</div>
      </motion.div>
    </div>
  );
};

const UserGuide = () => {
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);

  const sections = [
    {
      title: "Step 1: View the Dashboard",
      content: (
        <>
          After logging in, the Dashboard displays: <br />
          - <strong>Total Patient Counts</strong>: See the total number of
          patients, including counts for treated and untreated patients. <br />
          - <strong>Statistics & Charts</strong>: View categorized statistics
          and visual charts for conditions such as Diabetes, Hypertension, High
          Blood Pressure, Obesity, CVD Risk, and Kidney Disease. <br />
          - <strong>Outpatient List</strong>: A detailed list of all outpatients
          is shown, displaying: <br />
          - Patient ID, Name, Phone Number, Email, Diagnosis, and Treatment
          status. <br />
          - <strong>Search & Filter</strong>: Use the search bar to find a
          specific patient or filter the list to display either treated or
          untreated patients.
        </>
      ),
    },
    {
      title: "Step 2: Manage Patient Records",
      content: (
        <>
          <strong>View Patient Details</strong>: Click on the {"Details"} button
          (eye icon) next to a patient’s name to access their information:{" "}
          <br />
          1. <strong>Personal Information Section</strong>: View Patient ID,
          name, gender, blood type, date of birth, email, contact number, and
          address. Check the patient’s current treatment status, profile photo,
          and the date of the last treatment. <br />
          2. <strong>Medical Treatment Section</strong>: See a list of medical
          treatments with fields like Date, Blood Pressure, Glucose Level, Heart
          Rate, Weight, Height, Temperature, and Status. <br />
          - <strong>Status Colors</strong>: Yellow for Pending, Green for
          Treated, and Red for Untreated for easy identification. <br />
          - <strong>Add New Treatment</strong>: Click the {"Add"} button to
          record new treatment details.
        </>
      ),
    },
    {
      title: "Step 3: Update or Remove Treatment Records",
      content: (
        <>
          <strong>Edit Treatment</strong>: Click the {"Edit"} icon next to a
          treatment record to open a form, modify the details, and save the
          changes. <br />
          <strong>Delete Treatment</strong>: Click the {"Delete"} icon to remove
          a treatment record from the list. A confirmation may be required.
        </>
      ),
    },
    {
      title: "Step 4: Additional System Actions",
      content: (
        <>
          - <strong>Add New Patient</strong>: Click the {"Add Patient"} button
          to enter details for a new patient. <br />
          - <strong>Export Patient List</strong>: Use the {"Export"} button to
          download the patient list. <br />
          - <strong>Log Out</strong>: Click the {"Log out"} button from the
          sidebar to securely exit the system.
        </>
      ),
    },
  ];

  const handleAccordionClick = (index: number) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-200 flex flex-col justify-between px-6 py-4 h-screen">
      <div>
        <h2 className="text-black text-2xl py-4">System User Guide</h2>
        {sections.map((section, index) => (
          <Accordion
            key={index}
            title={section.title}
            content={section.content}
            isOpen={openSectionIndex === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
      </div>

      <p className="text-slate-600 py-4">
        <span className="text-black">Note:</span> Always ensure that patient
        details and medical records are handled securely and confidentially in
        compliance with healthcare regulations.
      </p>
    </div>
  );
};

export default UserGuide;
