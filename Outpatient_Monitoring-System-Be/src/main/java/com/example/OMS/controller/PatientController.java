package com.example.OMS.controller;

import com.example.OMS.model.Patient;
import com.example.OMS.service.PatientService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping()
    public ResponseEntity<List<Patient>> getAllPatients(){
        List<Patient> allPatients = patientService.getAllPatients();
        return ResponseEntity.ok(allPatients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id){
        Patient patient = patientService.getPatient(id);
        return ResponseEntity.ok(patient);
    }

    @PostMapping("/create")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient){
        Patient newPatient = patientService.createPatient(patient);
        return ResponseEntity.ok(newPatient);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patientData,@PathVariable Long id){
        Patient updatedPatient = patientService.updatePatient(patientData, id);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletepatient(@PathVariable Long id){
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient successfully deleted!");
    }
}
