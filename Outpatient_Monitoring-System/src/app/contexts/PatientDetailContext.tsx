/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode } from 'react';
import { useGetSinglePatient } from '../hooks/usePatientApi';
import { Patient } from '@/types/patientTypes';
import { useGetTreatment } from '../hooks/useTreatmentApi';

interface PatientContextProps {
    patient: Patient;
    refetchPatientInfo: any;
    medicalTreatments: any;
    refetchTreatments: any;
}

const PatientDetailContext = createContext<PatientContextProps | undefined>(undefined);

interface PatientProviderProps {
  id: number;
  children: ReactNode;
}

export const PatientDetailProvider: React.FC<PatientProviderProps> = ({ id, children }) => {

    const {data: patientData, refetch: refetchPatientInfo} = useGetSinglePatient(id);
  const { data: treatmentData, refetch: refetchTreatments } = useGetTreatment(id);
  

    const patient = patientData?.data || [];
    const medicalTreatments = treatmentData?.data || [];

  return (
    <PatientDetailContext.Provider value={{ patient, refetchPatientInfo ,medicalTreatments, refetchTreatments}}>
      {children}
    </PatientDetailContext.Provider>
  );
};

export const usePatientDetail = () => {
  const context = useContext(PatientDetailContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
