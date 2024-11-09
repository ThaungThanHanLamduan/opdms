import { useMutation, useQuery } from "react-query";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getDiagnosisCount,
  getSinglePatient,
  getTreatmentCount,
  getTreatmentStatus,
  updatePatient,
  updateTreatmentStatus,
} from "../api/patientApi";
import { Patient } from "@/types/patientTypes";

export const useGetAllPatients = (
  name?: string,
  id?: number,
  treatedStatus?: string,
  page?: number
) => {
  return useQuery(
    ["allPatients", name, id, treatedStatus, page],
    () => getAllPatients(name, id, treatedStatus, page)
  );
};

export const useGetSinglePatient = (id: number) => {
  return useQuery(["singlePatient", id], () => getSinglePatient({ id }));
};

export const useCreatePatient = () => {
  return useMutation((patientData: Patient) => createPatient(patientData));
};

export const useUpdatePatient = () => {
  return useMutation((patientData: Patient) => updatePatient(patientData));
};

export const useDeletePatient = () => {
  return useMutation((patientId: number) => deletePatient(patientId));
};

export const useGetTreatmentStatus = (patientId: number) => {
  return useQuery(["treatmentStatus", patientId], () =>
    getTreatmentStatus(patientId)
  );
};

export const useUpdateTreatmentStatus = () => {
  return useMutation(
    ({
      patientId,
      treatedStatus,
    }: {
      patientId: number;
      treatedStatus: string;
    }) => updateTreatmentStatus({ patientId, treatedStatus })
  );
};

export const useGetTreatmentCount = () => {
  return useQuery(["treatmentCount"], () => getTreatmentCount());
};

export const useGetDiagnosisCount = () => {
  return useQuery(["diagnosisCount"], () => getDiagnosisCount());
};
