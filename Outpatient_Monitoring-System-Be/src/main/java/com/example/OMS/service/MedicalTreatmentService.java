package com.example.OMS.service;

import com.example.OMS.model.MedicalTreatment;
import com.example.OMS.model.Patient;
import com.example.OMS.repository.MedicalTreatmentRepository;
import com.example.OMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicalTreatmentService {
    @Autowired
    private final MedicalTreatmentRepository medicalTreatmentRepository;
    @Autowired
    private final PatientRepository patientRepository;

    public MedicalTreatmentService(MedicalTreatmentRepository medicalTreatmentRepository, PatientRepository patientRepository) {
        this.medicalTreatmentRepository = medicalTreatmentRepository;
        this.patientRepository = patientRepository;
    }

    public MedicalTreatment createMedicalTreatment(MedicalTreatment medicalTreatment, Long patientId){
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if(!patientOptional.isPresent()){
            throw new IllegalArgumentException("Patient with id " + patientId +" is not found");
        }else{
            Patient patient = patientOptional.get();
            medicalTreatment.setPatient(patient);
            return medicalTreatmentRepository.save(medicalTreatment);
        }
    }

}
