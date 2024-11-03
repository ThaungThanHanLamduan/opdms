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
    updateTreatmentStatus
} from "../api/patientApi";
import { Patient } from "@/types/patientTypes";

export const useGetAllPatients = (name?: string, id?: number, treatedStatus?: string, pageNumber?: number) => {
    return useQuery({
        queryKey: ["allPatients", name, id, treatedStatus, pageNumber],
        queryFn: () => getAllPatients(name, id, treatedStatus, pageNumber),
    });
};

export const useGetSinglePatient = (id: number) => {
    return useQuery({
        queryKey: ["singlePatient", id],
        queryFn: () => getSinglePatient({ id }),
    });
};

export const useCreatePatient = () => {
    return useMutation({
        mutationFn: (patientData: Patient) => createPatient(patientData),
    });
};

export const useUpdatePatient = () => {
    return useMutation({
        mutationFn: (patientData: Patient) => updatePatient(patientData),
    });
};

export const useDeletePatient = () => {
    return useMutation({
        mutationFn: (patientId: number) => deletePatient(patientId),
    });
};

export const useGetTreatmentStatus = (patientId: number) => {
    return useQuery({
        queryKey: ["treatmentStatus", patientId],
        queryFn: () => getTreatmentStatus(patientId),
    });
};

export const useUpdateTreatmentStatus = () => {
    return useMutation({
        mutationFn: ({
            patientId,
            treatedStatus,
        }: {
            patientId: number;
            treatedStatus: string;
        }) => updateTreatmentStatus({ patientId, treatedStatus }),
    });
};

export const useGetTreatmentCount = () => {
    return useQuery({
        queryKey: ["treatmentCount"],
        queryFn: () => getTreatmentCount(),
    });
};

export const useGetDiagnosisCount = () => {
    return useQuery({
        queryKey: ["diagnosisCount"],
        queryFn: () => getDiagnosisCount(),
    });
};
