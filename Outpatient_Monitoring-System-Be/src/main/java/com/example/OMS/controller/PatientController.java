package com.example.OMS.controller;

import com.example.OMS.model.*;
import com.example.OMS.service.MedicalTreatmentService;
import com.example.OMS.service.PatientService;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService patientService;
    private final MedicalTreatmentService medicalTreatmentService;

    public PatientController(PatientService patientService, MedicalTreatmentService medicalTreatmentService) {
        this.patientService = patientService;
        this.medicalTreatmentService = medicalTreatmentService;
    }

    @GetMapping()
    public ResponseEntity<Page<Patient>> getAllPatients(@RequestParam(required = false) String name,
                                                        @RequestParam(required = false) String id,
                                                        @RequestParam(required = false) MedicalTreatment.TreatmentStatus treatedStatus,
                                                        @RequestParam(required=false, defaultValue = "0") String page){
        Page<Patient> allPatients = patientService.getAllPatients(name, id, treatedStatus, page);
        return ResponseEntity.ok(allPatients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id){
        Patient patient = patientService.getPatient(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/treatedStatus/{patientId}")
    public ResponseEntity<GetTreatmentStatusResponse> getPatientTreatedStatus(@PathVariable Long patientId){
        GetTreatmentStatusResponse response = medicalTreatmentService.getPatientTreatedStatus(patientId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/diagnosis_count")
    public ResponseEntity<List<GetDiagnosisCountResponse>> getDiagnosisCount(){
        List<GetDiagnosisCountResponse> response = patientService.getDiagnosisCount();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/treatment_count")
    public ResponseEntity<List<GetTreatedStatusCountResponse>> getTreatedStatusCount(){
        List<GetTreatedStatusCountResponse> response = medicalTreatmentService.getTreatedStatusCount();
        return ResponseEntity.ok(response);
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

    @PatchMapping("/update/treatedStatus/{patientId}")
    public ResponseEntity<String> updatePatientTreatedStatus(@RequestBody TreatmentStatusUpdateRequest request,
                                                             @PathVariable Long patientId){
        MedicalTreatment.TreatmentStatus status = request.getStatus();
        medicalTreatmentService.updatePatientTreatedStatus(status, patientId);

        return ResponseEntity.ok("Treated status has been updated for patient");
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletepatient(@PathVariable Long id){
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient successfully deleted!");
    }
}
