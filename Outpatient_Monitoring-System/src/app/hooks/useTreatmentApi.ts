import { Treatment } from "@/types/treatmentTypes"
import { useMutation, useQuery } from "react-query"
import { createTreatment, getTreatment, updateTreatment } from "../api/treatmentApi"

export const useCreateTreatment = () => {
    return useMutation({
        mutationFn: (treatmentData : Treatment) => createTreatment(treatmentData)
    })
}

export const useUpdateTreatment = () => {
    return useMutation({
        mutationFn: (treatmentData : Treatment) => updateTreatment(treatmentData)
    })
}

export const useGetTreatment = (patientId : number) => {
    return useQuery({
        queryKey: ["getTreatment", patientId],
        queryFn: () => getTreatment(patientId)
    })
}