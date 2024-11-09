export type Treatment = {
  id?: number,
  appointmentDate: string;
  patientId?: number;
  treatedStatus: string;
  medicalTreatmentDetails: {
    bloodPressure: string;
    glucoseLevel: number;
    heartRate: number;
    weight: number;
    height: number;
    bodyTempF: number;
  };
};
