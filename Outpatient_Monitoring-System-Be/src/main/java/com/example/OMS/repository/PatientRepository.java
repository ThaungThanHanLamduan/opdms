package com.example.OMS.repository;

import com.example.OMS.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findAllByOrderByCreatedAtDesc();
}
