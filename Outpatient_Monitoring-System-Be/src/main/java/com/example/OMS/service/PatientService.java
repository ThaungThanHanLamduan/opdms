package com.example.OMS.service;

import com.example.OMS.model.MedicalTreatment;
import com.example.OMS.model.Patient;
import com.example.OMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Page<Patient> getAllPatients(String name, String id, MedicalTreatment.TreatmentStatus treatedStatus,
                                        String page){
        Pageable pageable = PageRequest.of(Integer.parseInt(page), 10);
        if((name == null || name.isEmpty()) && (id == null || id.isEmpty()) && (treatedStatus == null || treatedStatus.describeConstable().isEmpty())){
            return patientRepository.findAllByOrderByCreatedAtDesc(pageable);
        }
        return patientRepository.searchPatients(name, id, treatedStatus, pageable);
    }
    public Patient getPatient(Long id){
        Optional<Patient> patientOptional = patientRepository.findById(id);
        if(patientOptional.isPresent()){
           return patientOptional.get();
        }else{
            throw new IllegalArgumentException("Patient not found");
        }

    }
    public Patient createPatient(Patient patient){
        return patientRepository.save(patient);
    }
    public Patient updatePatient(Patient patientData, Long id){
        Optional<Patient> existingPatientOptional = patientRepository.findById(id);
        if(!existingPatientOptional.isPresent()){
            throw new IllegalArgumentException("Patient with ID "  + id + " does not exist.");
        }else {
            Patient existingPatient = existingPatientOptional.get();
            if(patientData.getName() != null){
                existingPatient.setName(patientData.getName());
            }
            if(patientData.getPatientDetails().getDateOfBirth() != null){
                existingPatient.getPatientDetails().setDateOfBirth(patientData.getPatientDetails().getDateOfBirth());
            }
            if(patientData.getPatientDetails().getAddress() != null){
                existingPatient.getPatientDetails().setAddress(patientData.getPatientDetails().getAddress());
            }
            if(patientData.getPatientDetails().getBloodType() != null){
                existingPatient.getPatientDetails().setBloodType(patientData.getPatientDetails().getBloodType());
            }
            if(patientData.getPatientDetails().getContactNo() != null){
                existingPatient.getPatientDetails().setContactNo(patientData.getPatientDetails().getContactNo());
            }
            if(patientData.getPatientDetails().getDiagnosis() != null){
                existingPatient.getPatientDetails().setDiagnosis(patientData.getPatientDetails().getDiagnosis());
            }
            if(patientData.getPatientDetails().getEmail() != null){
                existingPatient.getPatientDetails().setEmail(patientData.getPatientDetails().getEmail());
            }
            if(patientData.getPatientDetails().getGender() != null){
                existingPatient.getPatientDetails().setGender(patientData.getPatientDetails().getGender());
            }
            if(patientData.getPatientDetails().getIdentification_no() != null){
                existingPatient.getPatientDetails().setIdentification_no(patientData.getPatientDetails().getIdentification_no());
            }
            return patientRepository.save(existingPatient);
        }
    }
    public void deletePatient(Long id){
        Optional<Patient> existingPatientOptional = patientRepository.findById(id);
        if(!existingPatientOptional.isPresent()){
            throw new IllegalArgumentException("Patient not found");
        }else{
            patientRepository.deleteById(id);
        }
    }
}
