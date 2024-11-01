import { BaseURL } from "@/service/ApiEndpoint";
import { Patient } from "@/types/patientTypes";
import axios from "axios";

export const getAllPatients =  async () => {
    try {
        const response = await axios.get(`${BaseURL}/api/patients`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        })

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createPatient = async (patientData: Patient) => {
    try {
        const response = await axios.post(`${BaseURL}/api/patients/create`, patientData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};