package com.example.OMS.model;

import java.time.LocalDate;

public class GetTreatmentStatusResponse {
    private String status;
    private String appointmentDate;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

}
