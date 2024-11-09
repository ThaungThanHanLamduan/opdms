package com.example.OMS.model;

public class TreatmentStatusUpdateRequest {
    private MedicalTreatment.TreatmentStatus status;

    // Getters and setters
    public MedicalTreatment.TreatmentStatus getStatus() {
        return status;
    }

    public void setStatus(MedicalTreatment.TreatmentStatus status) {
        this.status = status;
    }
}
