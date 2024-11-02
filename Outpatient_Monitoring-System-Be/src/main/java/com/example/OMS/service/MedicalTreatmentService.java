package com.example.OMS.service;

import com.example.OMS.model.*;
import com.example.OMS.repository.MedicalTreatmentRepository;
import com.example.OMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
            if(medicalTreatmentData.getMedicalTreatmentDetails().getBloodPressure() != null){
                existingTreatment.getMedicalTreatmentDetails().setBloodPressure(medicalTreatmentData.getMedicalTreatmentDetails().getBloodPressure());
            }
            if(medicalTreatmentData.getMedicalTreatmentDetails().getGlucoseLevel() != null){
                existingTreatment.getMedicalTreatmentDetails().setGlucoseLevel(medicalTreatmentData.getMedicalTreatmentDetails().getGlucoseLevel());
            }
            if(medicalTreatmentData.getMedicalTreatmentDetails().getHeight() != null){
                existingTreatment.getMedicalTreatmentDetails().setHeight(medicalTreatmentData.getMedicalTreatmentDetails().getHeight());
            }
            if(medicalTreatmentData.getMedicalTreatmentDetails().getWeight() != null){
                existingTreatment.getMedicalTreatmentDetails().setWeight(medicalTreatmentData.getMedicalTreatmentDetails().getWeight());
            }
            if(medicalTreatmentData.getMedicalTreatmentDetails().getHeartRate() != null){
                existingTreatment.getMedicalTreatmentDetails().setHeartRate(medicalTreatmentData.getMedicalTreatmentDetails().getHeartRate());
            }
            if(medicalTreatmentData.getTreatedStatus() != null){
                existingTreatment.setTreatedStatus(medicalTreatmentData.getTreatedStatus());
            }

            return medicalTreatmentRepository.save(existingTreatment);
        }
    }

    public GetTreatmentStatusResponse getPatientTreatedStatus(Long patientId){
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        if(!patientOpt.isPresent()){
            throw new IllegalArgumentException("Patient with id " + patientId + " does not exist.");
        }else{
            Patient existingPatient = patientOpt.get();
            List<MedicalTreatment> treatments = existingPatient.getMedicalTreatments();
            if(treatments.size() > 0){
                MedicalTreatment lastTreatment = existingPatient.getMedicalTreatments().getLast();
                GetTreatmentStatusResponse response = new GetTreatmentStatusResponse();
                response.setStatus(lastTreatment.getTreatedStatus() + "");
                response.setAppointmentDate(lastTreatment.getAppointmentDate() + "");
                return response;
            }else{
                GetTreatmentStatusResponse response = new GetTreatmentStatusResponse();
                response.setAppointmentDate("");
                response.setStatus("");
                return response;
            }
        }
    }

    public void updatePatientTreatedStatus(MedicalTreatment.TreatmentStatus status, Long patientId){
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        if(!patientOpt.isPresent()){
            throw new IllegalArgumentException("Patient with id " + patientId + " does not exist.");
        }else{
            Patient existingPatient = patientOpt.get();
            List<MedicalTreatment> treatments = existingPatient.getMedicalTreatments();
            if(treatments.size() > 0){
                MedicalTreatment lastTreatment = existingPatient.getMedicalTreatments().getLast();
                lastTreatment.setTreatedStatus(status);
                medicalTreatmentRepository.save(lastTreatment);
            }else{
                throw new IllegalArgumentException("This patient doesn't have medical treatment history.");
            }
        }
    }

    public List<GetTreatedStatusCountResponse> getTreatedStatusCount(){
        List<MedicalTreatment> treatments = medicalTreatmentRepository.findAll();
        Map<MedicalTreatment.TreatmentStatus, Integer> treatmentMap = new HashMap<>();

        for(MedicalTreatment treatment : treatments){
            MedicalTreatment.TreatmentStatus treatedStatus = treatment.getTreatedStatus();
            treatmentMap.put(treatedStatus, treatmentMap.getOrDefault(treatment, 0) + 1);
        }

        return treatmentMap.entrySet().stream()
                .map(treatment-> {
                    GetTreatedStatusCountResponse getTreatedStatusCount = new GetTreatedStatusCountResponse();
                    getTreatedStatusCount.setTreatedStatus(treatment.getKey());
                    getTreatedStatusCount.setCount(treatment.getValue());
                    return getTreatedStatusCount;
                }).collect(Collectors.toList());
    }
}
