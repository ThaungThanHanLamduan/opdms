import { BaseURL } from "@/service/ApiEndpoint";
import { getToken } from "@/service/authService";
import { Patient } from "@/types/patientTypes";
import axios from "axios";

const token = getToken();

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BaseURL}/api/patients`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePatient = async ({ id }: { id: number }) => {
  try {
    const response = await axios.get(`${BaseURL}/api/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createPatient = async (patientData: Patient) => {
  try {
    const response = await axios.post(
      `${BaseURL}/api/patients/create`,
      patientData,
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
    console.error(error);
  }
};

export const updatePatient = async (patientData: Patient) => {
  try {
    const response = await axios.patch(
      `${BaseURL}/api/patients/update/${patientData.id}`,
      patientData,
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
    console.error(error);
  }
};

export const deletePatient = async (patientId: number) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/api/patients/delete/${patientId}`,
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
    console.error(error);
  }
};

export const getTreatmentStatus = async (patientId: number) => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/treatedStatus/${patientId}`,
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
    console.error(error);
  }
};

export const updateTreatmentStatus = async ({
  patientId,
  treatedStatus
}: {
  patientId: number;
  treatedStatus: string;
}) => {
  try {
    const response = await axios.patch(
      `${BaseURL}/api/patients/update/treatedStatus/${patientId}`,
        {
            status:treatedStatus
        },
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
    console.error(error);
  }
};
