export type Treatment = {
  appointmentDate: string;
  patientId?: number;
  treatedStatus: string;
  medicalTreatmentDetails: {
    bloodPressure: string;
    glucoseLevel: number;
    heartRate: number;
    weight: number;
    height: number;
    bodyTemperature: number;
  };
};
