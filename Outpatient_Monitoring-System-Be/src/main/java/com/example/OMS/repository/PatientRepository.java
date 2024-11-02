package com.example.OMS.repository;

import com.example.OMS.model.MedicalTreatment;
import com.example.OMS.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findAllByOrderByCreatedAtDesc();

    @Query("SELECT p FROM Patient p " +
            "LEFT JOIN p.medicalTreatments mt " +
            "ON mt.id = (SELECT MAX(mt2.id) FROM MedicalTreatment mt2 WHERE mt2.patient.id = p.id) " +
            "WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:id IS NULL OR p.id = :id) " +
            "AND (:treatedStatus IS NULL OR mt.treatedStatus = :treatedStatus)"
    )
    List<Patient> searchPatients(@Param("name") String name,
                                 @Param("id") String id,
                                 @Param("treatedStatus") MedicalTreatment.TreatmentStatus treatedStatus);
}
