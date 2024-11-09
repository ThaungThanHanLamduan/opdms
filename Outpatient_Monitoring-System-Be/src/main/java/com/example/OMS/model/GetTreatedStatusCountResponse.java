package com.example.OMS.model;

public class GetTreatedStatusCountResponse {
    private MedicalTreatment.TreatmentStatus treatedStatus;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public MedicalTreatment.TreatmentStatus getTreatedStatus() {
        return treatedStatus;
    }

    public void setTreatedStatus(MedicalTreatment.TreatmentStatus treatedStatus) {
        this.treatedStatus = treatedStatus;
    }

    private Integer count;


}
