import { BaseURL } from "@/service/ApiEndpoint";
import { getToken } from "@/service/authService";
import { Treatment } from "@/types/treatmentTypes";
import axios from "axios";

const token = getToken();

export const createTreatment = async (treatmentData: Treatment) => {
  try {
    const response = await axios.post(
      `${BaseURL}/api/treatments/create/${treatmentData.patientId}`,
      treatmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTreatment = async (treatmentData: Treatment) => {
  console.log(treatmentData.id);
  
  try {
    const response = await axios.patch(
      `${BaseURL}/api/treatments/update/${treatmentData.id}`,
      treatmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTreatment = async (patientId: number) => {
  try {
    const response = await axios.get(`${BaseURL}/api/treatments/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTreatment = async (treatmentId : number) => {
  try {
    const response = await axios.delete(`${BaseURL}/api/treatments/delete/${treatmentId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    return response;
  } catch (error) {
    console.log(error)
  }
}
