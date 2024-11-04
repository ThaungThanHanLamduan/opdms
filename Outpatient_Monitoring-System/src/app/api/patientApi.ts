import { BaseURL } from "@/service/ApiEndpoint";
import { getToken } from "@/service/authService";
import { Patient } from "@/types/patientTypes";
import axios from "axios";

const token = getToken();

export const getAllPatients = async (
  name?: string,
  id?: number,
  treatedStatus?: string,
  pageNumber? :number
) => {
  try {
    const params = new URLSearchParams();

    if (name) params.append('name',name)

    if (id) params.append('id',id.toString())

    if (treatedStatus) params.append('treatedStatus', treatedStatus)

    if(pageNumber  !== undefined ) params.append('pageNumber', pageNumber.toString())
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl)

    const response = await axios.get(`${BaseURL}/api/patients`, {
      params,
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

export const getTreatmentCount = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/treatment_count`,
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

export const getDiagnosisCount = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/api/patients/diagnosis_count`,
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
