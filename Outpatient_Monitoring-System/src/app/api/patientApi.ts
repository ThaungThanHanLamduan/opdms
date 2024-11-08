import { BaseURL } from "@/service/ApiEndpoint";
import { getToken } from "@/service/authService";
import { Patient } from "@/types/patientTypes";
import axios from "axios";

const token = getToken();

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getAllPatients = async (
  name?: string,
  id?: number,
  treatedStatus?: string,
  page?: number
) => {
  try {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (id) params.set("id", id.toString());
    if (treatedStatus) params.set("treatedStatus", treatedStatus);
    if (page !== undefined && page !== 0) params.set("page", page.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    window.history.replaceState({}, "", newUrl);

    const response = await axios.get(`${BaseURL}/api/patients`, {
      params: Object.fromEntries(params.entries()),
      headers,
    });

    return response;
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};




export const getSinglePatient = async ({ id }: { id: number }) => {
  try {
    const response = await axios.get(`${BaseURL}/api/patients/${id}`, {
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createPatient = async (patientData: Patient) => {
  try {
    const response = await axios.post(
      `${BaseURL}/api/patients/create`,
      patientData,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePatient = async (patientData: Patient) => {
  try {
    const response = await axios.patch(
      `${BaseURL}/api/patients/update/${patientData.id}`,
      patientData,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deletePatient = async (patientId: number) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/api/patients/delete/${patientId}`,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTreatmentStatus = async (patientId: number) => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/treatedStatus/${patientId}`,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTreatmentStatus = async ({
  patientId,
  treatedStatus,
}: {
  patientId: number;
  treatedStatus: string;
}) => {
  try {
    const response = await axios.patch(
      `${BaseURL}/api/patients/update/treatedStatus/${patientId}`,
      {
        status: treatedStatus,
      },
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTreatmentCount = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/treatment_count`,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDiagnosisCount = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/diagnosis_count`,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
