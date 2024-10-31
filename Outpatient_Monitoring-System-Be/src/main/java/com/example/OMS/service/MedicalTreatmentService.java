package com.example.OMS.service;

import com.example.OMS.model.MedicalTreatment;
import com.example.OMS.model.Patient;
import com.example.OMS.repository.MedicalTreatmentRepository;
import com.example.OMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<MedicalTreatment> getPatientMedicalTreatments(Long patientId){
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if(!patientOptional.isPresent()){
            throw new IllegalArgumentException("Patient with ID " + patientId + " is not found!");
        }else{
            Patient existingPatient = patientOptional.get();
            return existingPatient.getMedicalTreatments();
        }
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

    public MedicalTreatment updateMedicalTreatment(MedicalTreatment medicalTreatmentData, Long treatmentId){
        Optional<MedicalTreatment> existingTreatmentOptional = medicalTreatmentRepository.findById(treatmentId);
        if(!existingTreatmentOptional.isPresent()){
            throw new IllegalArgumentException("Patient with ID "  + treatmentId + " does not exist.");
        }else {
            MedicalTreatment existingTreatment = existingTreatmentOptional.get();
            if(medicalTreatmentData.getAppointmentDate() != null){
                existingTreatment.setAppointmentDate(medicalTreatmentData.getAppointmentDate());
            }
            if(medicalTreatmentData.getBloodPressure() != null){
                existingTreatment.setBloodPressure(medicalTreatmentData.getBloodPressure());
            }
            if(medicalTreatmentData.getGlucoseLevel() != null){
                existingTreatment.setGlucoseLevel(medicalTreatmentData.getGlucoseLevel());
            }
            if(medicalTreatmentData.getHeight() != null){
                existingTreatment.setHeight(medicalTreatmentData.getHeight());
            }
            if(medicalTreatmentData.getWeight() != null){
                existingTreatment.setWeight(medicalTreatmentData.getWeight());
            }
            if(medicalTreatmentData.getHeartRate() != null){
                existingTreatment.setHeartRate(medicalTreatmentData.getHeartRate());
            }
            if(medicalTreatmentData.getTreatedStatus() != null){
                existingTreatment.setTreatedStatus(medicalTreatmentData.getTreatedStatus());
            }

            return medicalTreatmentRepository.save(existingTreatment);
        }
    }

    public MedicalTreatment.TreatmentStatus getPatientTreatedStatus(Long patientId){
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        if(!patientOpt.isPresent()){
            throw new IllegalArgumentException("Patient with id " + patientId + " does not exist.");
        }else{
            Patient existingPatient = patientOpt.get();
            MedicalTreatment lastTreatment = existingPatient.getMedicalTreatments().getLast();
            return lastTreatment.getTreatedStatus();
        }
    }
}
