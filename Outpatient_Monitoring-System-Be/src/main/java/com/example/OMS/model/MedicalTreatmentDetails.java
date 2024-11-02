package com.example.OMS.model;

import jakarta.persistence.*;

@Entity
@Table(name="medical_treatment_details")
public class MedicalTreatmentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "heart_rate", nullable = true)
    private Integer heartRate;

    @Column(name = "blood_pressure", nullable = true)
    private String bloodPressure;

    @Column(name = "glucose_level", nullable = true)
    private Integer glucoseLevel;

    @Column(name = "height_cm", nullable = true)
    private Double height;

    @Column(name = "weight_kg", nullable = true)
    private Double weight;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
