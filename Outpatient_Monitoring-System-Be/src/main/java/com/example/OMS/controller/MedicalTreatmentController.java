package com.example.OMS.controller;

import com.example.OMS.model.MedicalTreatment;
import com.example.OMS.service.MedicalTreatmentService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/treatments")
public class MedicalTreatmentController {
    private final MedicalTreatmentService medicalTreatmentService;

    public MedicalTreatmentController(MedicalTreatmentService medicalTreatmentService) {
        this.medicalTreatmentService = medicalTreatmentService;
    }
    @GetMapping("/{patientId}")
    public ResponseEntity<List<MedicalTreatment>> getPatientMedicalRecords(@PathVariable Long patientId){
        List<MedicalTreatment> patientMedicalTreatments = medicalTreatmentService.getPatientMedicalTreatments(patientId);
        return ResponseEntity.ok(patientMedicalTreatments);
    }

    @PostMapping("/create/{patientId}")
    public ResponseEntity<MedicalTreatment> createMedicalRecord(@RequestBody MedicalTreatment medicalTreatment,
                                                                @PathVariable Long patientId){
        MedicalTreatment createdMedicalTreatment = medicalTreatmentService.createMedicalTreatment(medicalTreatment,
                patientId);
        return ResponseEntity.ok(createdMedicalTreatment);
    }

    @PatchMapping("/update/{treatmentId}")
    public ResponseEntity<MedicalTreatment> updateMedicalRecord(@RequestBody MedicalTreatment medicalTreatment,
                                                                @PathVariable Long treatmentId){
        MedicalTreatment updatedMedicalTreatment = medicalTreatmentService.updateMedicalTreatment(medicalTreatment,
                treatmentId);
        return ResponseEntity.ok(updatedMedicalTreatment);
    }

    @DeleteMapping("/delete/{treatmentId}")
    public ResponseEntity<String> deleteMedicalRecord(@PathVariable Long treatmentId){
        medicalTreatmentService.deleteMedicalTreatment(treatmentId);
        return ResponseEntity.ok("Treatment with id " + treatmentId + " has been deleted successfully!");
    }
}
