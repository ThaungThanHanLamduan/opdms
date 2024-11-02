import { useMutation, useQuery } from "react-query"
import { createPatient, deletePatient, getAllPatients, getSinglePatient, updatePatient } from "../api/patientApi"
import { Patient } from "@/types/patientTypes"

export const useGetAllPatients = () => {
    return useQuery({
        queryKey: ["allPatients"],
        queryFn: () => getAllPatients()
    })
}

export const useGetSinglePatient = (id: number) => {
    return useQuery({
        queryKey: ["singlePatient",id],
        queryFn: () => getSinglePatient({id})
    })
}

export const useCreatePatient = () => {
    return useMutation({
        mutationFn: (patientData : Patient) => createPatient(patientData)
    })
}

export const useUpdatePatient = () => {
    return useMutation({
        mutationFn: (patientData : Patient) => updatePatient(patientData)
    })
} 

export const useDeletePatient = () => {
    return useMutation({
        mutationFn: (patientId : number) => deletePatient(patientId)
    })
} 