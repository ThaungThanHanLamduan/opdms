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

    @Column(name = "heart_rate", nullable=true)
    private Integer heartRate;

    @Column(name = "blood_pressure", nullable = true)
    private String bloodPressure;

    @Column(name = "glucose_level", nullable = true)
    private Integer glucoseLevel;

    @Column(name = "height_cm", nullable = true)
    private Double height;

    @Column(name = "weight_kg", nullable = true)
    private Double weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "treated_status", nullable = true)
    private TreatmentStatus treatedStatus = TreatmentStatus.PENDING;

    public enum TreatmentStatus {
        PENDING,
        TREATED,
        UNTREATED
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

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public Integer getGlucoseLevel() {
        return glucoseLevel;
    }

    public void setGlucoseLevel(Integer glucoseLevel) {
        this.glucoseLevel = glucoseLevel;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public TreatmentStatus getTreatedStatus() {
        return treatedStatus;
    }

    public void setTreatedStatus(TreatmentStatus treatedStatus) {
        this.treatedStatus = treatedStatus;
    }

}
