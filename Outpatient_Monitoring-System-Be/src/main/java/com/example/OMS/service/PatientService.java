package com.example.OMS.service;

import com.example.OMS.model.Patient;
import com.example.OMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
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
            if(patientData.getDateOfBirth() != null){
                existingPatient.setDateOfBirth(patientData.getDateOfBirth());
            }
            if(patientData.getAddress() != null){
                existingPatient.setAddress(patientData.getAddress());
            }
            if(patientData.getBloodType() != null){
                existingPatient.setBloodType(patientData.getBloodType());
            }
            if(patientData.getContactNo() != null){
                existingPatient.setContactNo(patientData.getContactNo());
            }
            if(patientData.getDiagnosis() != null){
                existingPatient.setDiagnosis(patientData.getDiagnosis());
            }
            if(patientData.getEmail() != null){
                existingPatient.setEmail(patientData.getEmail());
            }
            if(patientData.getGender() != null){
                existingPatient.setGender(patientData.getGender());
            }
            if(patientData.getIdentification_no() != null){
                existingPatient.setIdentification_no(patientData.getIdentification_no());
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
