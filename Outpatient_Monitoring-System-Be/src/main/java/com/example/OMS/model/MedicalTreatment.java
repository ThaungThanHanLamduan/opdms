package com.example.OMS.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medical_treatment")
public class MedicalTreatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonBackReference
    private Patient patient;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "treated_status", nullable = true)
    private TreatmentStatus treatedStatus = TreatmentStatus.PENDING;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "medical_treatment_details_id", referencedColumnName = "id")
    private MedicalTreatmentDetails medicalTreatmentDetails;

    public enum TreatmentStatus {
        PENDING,
        TREATED,
        UNTREATED,
        TOTAL
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public TreatmentStatus getTreatedStatus() {
        return treatedStatus;
    }

    public void setTreatedStatus(TreatmentStatus treatedStatus) {
        this.treatedStatus = treatedStatus;
    }

    public MedicalTreatmentDetails getMedicalTreatmentDetails() {
        return medicalTreatmentDetails;
    }

    public void setMedicalTreatmentDetails(MedicalTreatmentDetails medicalTreatmentDetails) {
        this.medicalTreatmentDetails = medicalTreatmentDetails;
    }
}
