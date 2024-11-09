import { Treatment } from "@/types/treatmentTypes";
import { useMutation, useQuery } from "react-query";
import {
  createTreatment,
  deleteTreatment,
  getTreatment,
  updateTreatment,
} from "../api/treatmentApi";

export const useCreateTreatment = () => {
  return useMutation((treatmentData: Treatment) =>
    createTreatment(treatmentData)
  );
};

export const useUpdateTreatment = () => {
  return useMutation((treatmentData: Treatment) =>
    updateTreatment(treatmentData)
  );
};

export const useGetTreatment = (patientId: number) => {
  return useQuery(["getTreatment", patientId], () => getTreatment(patientId));
};

export const useDeleteTreatment = () => {
  return useMutation((treatmentId: number) => deleteTreatment(treatmentId));
};
