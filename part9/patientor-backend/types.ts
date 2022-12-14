// enums

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// Diagnosis typings

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

// Entry typings

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Diagnosis['code'][]
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

// Patient typings

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type CensoredPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;