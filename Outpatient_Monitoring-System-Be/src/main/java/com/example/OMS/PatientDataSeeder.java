package com.example.OMS;

import com.example.OMS.model.Patient;
import com.example.OMS.repository.PatientRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class PatientDataSeeder implements CommandLineRunner {
    private final PatientRepository patientRepository;
    private final ObjectMapper objectMapper;

    public PatientDataSeeder(PatientRepository patientRepository, ObjectMapper objectMapper){
        this.patientRepository = patientRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception{
        if(patientRepository.count() == 0){
            TypeReference<List<Patient>> typeReference = new TypeReference<List<Patient>>(){};
            try(InputStream inputStream = TypeReference.class.getResourceAsStream("/data/patients.json")){
                List<Patient> patients = objectMapper.readValue(inputStream, typeReference);
                patientRepository.saveAll(patients);
                System.out.println("Patient data seeded successfully");
            }   catch (Exception e) {
                System.out.println("Unable to seed data: " + e.getMessage());
            }} else {
                System.out.println("Patient data already exists.");
            }
        }
}
