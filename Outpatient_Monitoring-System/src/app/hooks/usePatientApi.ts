import { useMutation, useQuery } from "react-query"
import { createPatient, getAllPatients } from "../api/patientApi"
import { Patient } from "@/types/patientTypes"

export const useGetAllPatients = () => {
    return useQuery({
        queryKey: ["allPatients"],
        queryFn: () => getAllPatients()
    })
}

export const useCreatePatient = () => {
    return useMutation({
        mutationFn: (patientData : Patient) => createPatient(patientData)
    })
}