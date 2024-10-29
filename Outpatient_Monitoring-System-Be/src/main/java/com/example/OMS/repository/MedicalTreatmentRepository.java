package com.example.OMS.repository;

import com.example.OMS.model.MedicalTreatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalTreatmentRepository extends JpaRepository<MedicalTreatment, Long> {
}
