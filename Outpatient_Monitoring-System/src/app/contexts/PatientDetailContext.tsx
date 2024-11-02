import React, { createContext, useContext, ReactNode } from 'react';
import { useGetSinglePatient } from '../hooks/usePatientApi';
import { Patient } from '@/types/patientTypes';

interface PatientContextProps {
    patient: Patient;
}

const PatientDetailContext = createContext<PatientContextProps | undefined>(undefined);

interface PatientProviderProps {
  id: number;
  children: ReactNode;
}

export const PatientDetailProvider: React.FC<PatientProviderProps> = ({ id, children }) => {

    const {data} = useGetSinglePatient(id);
    const patient = data?.data || [];

  return (
    <PatientDetailContext.Provider value={{ patient }}>
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
