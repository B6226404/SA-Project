import { DoctorsInterface } from "./IDoctor";
import { PatientsInterface } from "./IPatient";
import { ClinicsInterface } from "./IClinic";
import { DiseasesInterface } from "./IDisease";
import { MedicinesInterface } from "./IMedicine";

export interface ExaminationInterface {
  ID: number,
  Treatment: string,
  TreatmentCost: number,
  MedicineCost: number,
  TreatmentTime: Date,
  DoctorID: number,
  Doctor: DoctorsInterface,
  PatientID: number,
  Patient: PatientsInterface,
  ClinicID: number,
  Clinic: ClinicsInterface,
  DiseaseID: number,
  Disease: DiseasesInterface,
  MedicineID: number,
  Medicine: MedicinesInterface,
}